'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const transactions = [
    {
        id: "1",
        date: "2024-02-15",
        description: "Coffee Shop",
        amount: 5.99,
        status: "completed",
        type: "payment",
        from: "0x1234...5678",
        to: "0x8765...4321",
    },
    // Add more mock data
]

export default function HistoryPage() {
    return (
        <div className="container py-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Transaction History</CardTitle>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Transactions</SelectItem>
                            <SelectItem value="sent">Sent</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell className="capitalize">{tx.type}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>${tx.amount.toFixed(2)}</TableCell>
                                    <TableCell className="font-mono">{tx.from}</TableCell>
                                    <TableCell className="font-mono">{tx.to}</TableCell>
                                    <TableCell>
                    <span className={
                        tx.status === "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                    }>
                      {tx.status}
                    </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}