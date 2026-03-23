import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "devStorage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
