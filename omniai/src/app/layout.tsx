import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OmniAI - Compare AI Models',
  description: 'Compare responses from ChatGPT, Gemini, Grok, and DeepSeek in one place.',
  keywords: 'AI, ChatGPT, Gemini, Grok, DeepSeek, comparison',
  authors: [{ name: 'OmniAI Team' }],
  viewport: 'width=device-width, initial-scale=1.0',
  themeColor: '#0B0F19',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
