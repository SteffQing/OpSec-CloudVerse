import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "OpSec CloudVerse",
  description:
    "OpSec Cloudverse empowers remote access and control of blockchain nodes and servers, ensuring security, performance, and convenience for web3 users.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={client}>
          <Navbar />
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
