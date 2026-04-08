import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/base/globals.css";
import QueryProvider from "@/providers/QueryProvider";
// import ReduxProvider from "@/providers/ReduxProvider"; // To be created if needed
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Animated Learning Portal",
  description: "Next-generation animated learning platform for kids and students.",
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
