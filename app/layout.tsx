import { NextUIProvider } from "@/providers/nextui-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import ModalShareMeetingLink from "@/components/modals/share-meeting-link-modal";
import ConvexClientProvider from "@/providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jinx",
  description: "",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NextUIProvider>
            <ConvexClientProvider>
              <div className="h-[100vh]">{children}</div>
            </ConvexClientProvider>
            <Toaster />
            <ModalShareMeetingLink />
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
