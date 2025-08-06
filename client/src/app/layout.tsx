import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";
import { QueryProvider } from "@/components/QueryProvider";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vulcan Engine",
  description: "Vulcan Engineは、ビジネスのためのプラットフォームです。",
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
      <body className={`${notoSansJP.className} bg-primary-100`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
