import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { SidebarProvider } from "@/context/sidebar-provider";
import { BluetoothProvider } from "@/context/bluetooth-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drive Save",
  description: "Sistem deteksi kantuk cerdas untuk keselamatan berkendara Anda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SidebarProvider>
            <BluetoothProvider>
            <TooltipProvider>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1 pb-20 md:pb-0">{children}</main>
                  <Footer />
                </div>
              </div>
              <MobileNav />
              <Toaster position="top-right" richColors />
            </TooltipProvider>
            </BluetoothProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
