import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";

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
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
