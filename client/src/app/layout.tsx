import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "@/styles/globals.css";

const notoSans = Noto_Sans_JP({
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
      <body className={`${notoSans.className} bg-primary-50`}>{children}</body>
    </html>
  );
}
