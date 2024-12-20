'use client'

import { SessionProvider } from "next-auth/react"
export default function StoreWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider >
            {children}
        </SessionProvider>
    );
}
