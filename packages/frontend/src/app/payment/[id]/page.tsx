'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"
import { usePaymentStore } from "@/lib/stores/payment"
import { PaymentStatus } from "@/components/payment/payment-status"
import { formatDistance } from "date-fns"

export default function PaymentConfirmPage({
                                               params,
                                           }: {
    params: { id: string }
}) {
    const router = useRouter()
    const { toast } = useToast()
    const { getPayment, updatePayment } = usePaymentStore()
    const [isProcessing, setIsProcessing] = useState(false)

    const payment = getPayment(params.id)

    useEffect(() => {
        if (!payment) {
            toast({
                variant: "destructive",
                title: "Payment Not Found",
                description: "The payment you're looking for doesn't exist.",
            })
            router.push("/payments")
        }
    }, [payment, router, toast])

    const handleConfirmPayment = async () => {
        try {
            setIsProcessing(true)
            // Update payment status to processing
            updatePayment(params.id, { status: 'processing' })

            // Simulate blockchain transaction
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Update payment status to completed
            updatePayment(params.id, { status: 'completed' })

            toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
            })

            // Wait a bit before redirecting
            setTimeout(() => {
                router.push("/payments")
            }, 1500)

        } catch (error) {
            updatePayment(params.id, { status: 'failed' })
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: "There was an error processing your payment.",
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleCancel = () => {
        updatePayment(params.id, { status: 'failed' })
        router.push("/payments")
    }

    if (!payment) {
        return null
    }

    return (
        <div className="container py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Payment Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <PaymentStatus
                        status={payment.status}
                        onComplete={() => console.log("Payment completed")}
                    />

                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="text-lg font-medium">${payment.amount} USDC</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Created</p>
                            <p className="text-lg font-medium">
                                {formatDistance(new Date(payment.createdAt), new Date(), { addSuffix: true })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Description</p>
                            <p className="text-lg font-medium">{payment.description}</p>
                        </div>
                        {payment.to && (
                            <div>
                                <p className="text-sm text-muted-foreground">To</p>
                                <p className="text-lg font-medium font-mono">{payment.to}</p>
                            </div>
                        )}
                    </div>

                    {payment.status === 'pending' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-800">
                                Please review the payment details before confirming.
                            </p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isProcessing || payment.status !== 'pending'}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmPayment}
                        disabled={isProcessing || payment.status !== 'pending'}
                    >
                        {isProcessing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Payment
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}