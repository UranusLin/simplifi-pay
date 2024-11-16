'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import QRCode from "react-qr-code"
import { usePaymentStore } from "@/lib/stores/payment"

const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    description: z.string().min(1, "Description is required"),
})

export default function CreatePaymentPage() {
    const { toast } = useToast()
    const { addPayment } = usePaymentStore()
    const [qrCodeData, setQrCodeData] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            description: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Create new payment
            const payment = {
                id: `payment_${Date.now()}`,
                amount: values.amount,
                description: values.description,
                status: 'pending' as const,
                createdAt: new Date().toISOString(),
                from: '', // Will be set when customer pays
                to: 'merchant_address', // Should be merchant's address
            }

            addPayment(payment)

            // Generate QR code data
            const qrData = JSON.stringify({
                type: 'payment',
                id: payment.id,
                amount: payment.amount,
                description: payment.description,
            })

            setQrCodeData(qrData)

            toast({
                title: "Payment Created",
                description: "QR code has been generated for customer.",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error creating the payment.",
            })
        }
    }

    return (
        <div className="container py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create Payment Request</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount (USDC)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0.00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Payment for..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Generate QR Code</Button>
                                </form>
                            </Form>
                        </div>

                        {qrCodeData && (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <QRCode value={qrCodeData} size={256} />
                                <p className="text-sm text-muted-foreground text-center">
                                    Scan this QR code with SimpliFi Pay app to make payment
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}