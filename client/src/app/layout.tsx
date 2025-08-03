import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "@/styles/globals.css";
import { QueryProvider } from "@/components/QueryProvider";

const notoSerif = Noto_Serif({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vulcan",
  description: "Vulcan is a platform for creating and managing your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${notoSerif.className} bg-amber-50/30`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
