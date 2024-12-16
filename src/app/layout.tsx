import { Footer, Navbar } from "@/components";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { dark } from '@clerk/themes';
import { Inter } from "next/font/google";
import dynamic from "next/dynamic"; // Import dynamic from Next.js

const font = Inter({ subsets: ["latin"] });

// Dynamically import ClerkProvider to avoid SSR issues
const ClerkProvider = dynamic(() => import('@clerk/nextjs').then((mod) => mod.ClerkProvider), {
    ssr: false,
    loading: () => <div>Loading...</div> // Optionally, display a loading component
});

export const metadata = SITE_CONFIG;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
                    font.className
                )}
            >
                {/* Dynamically load ClerkProvider to avoid SSR rendering issues */}
                <ClerkProvider appearance={{ baseTheme: dark }}>
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
