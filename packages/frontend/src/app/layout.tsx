import { Providers } from '@/providers'
import { MainNav } from '@/components/main-nav'
import { UserNav } from '@/components/user-nav'
import { NotificationBell } from '@/components/notifications/notification-bell'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
            <div className="relative flex min-h-screen flex-col">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center">
                        <MainNav />
                        <div className="ml-auto flex items-center space-x-4">
                            <NotificationBell />
                            <UserNav />
                        </div>
                    </div>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </Providers>
        </body>
        </html>
    )
}