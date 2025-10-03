import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Task Manager - Organize your tasks efficiently',
  description:
    'A modern task manager with priorities, categories, and due dates.',
  keywords: ['task manager', 'todo app', 'nextjs todo', 'organize tasks'],
  openGraph: {
    title: 'Task Manager',
    description:
      'Organize your tasks efficiently with categories, due dates & more.',
    url: 'https://todo-next-on.vercel.app/',
    siteName: 'Task Manager',
    images: [
      {
        url: 'https://todo-next-on.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Task Manager',
    description: 'Organize your tasks efficiently with priorities & due dates.',
    images: ['https://todo-next-on.vercel.app/twitter-card.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
