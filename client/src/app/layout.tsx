import type { Metadata } from "next";
import { QueryProvider } from "@/components/provider/query-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import "@/styles/globals.css";

import theme from "@/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export const metadata: Metadata = {
  title: {
    template: "%s | Axis42",
    default: "Axis42",
  },
  description: "Axis42は、ビジネスのためのプラットフォームです。",
};

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
      <body className={`${notoSansJP.variable} ${roboto.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
