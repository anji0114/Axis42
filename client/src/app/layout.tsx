import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import { QueryProvider } from "@/components/provider/query-provider";
import "@/styles/globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vulcan Engine",
    default: "Vulcan Engine",
  },
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
      <body
        className={`${notoSansJP.className} ${roboto.variable} bg-primary-100`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
