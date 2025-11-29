import './globals.css';

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "E-Voting",
  description: "Secure e-voting demo",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col bg-linear-to-b from-brand-50 to-white font-sans text-gray-900"
      >
        <header className="bg-white/80 backdrop-blur sticky top-0 z-20 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <span className="text-xl font-semibold text-brand-700">
                E-Voting
              </span>
            </Link>
            <nav className="text-sm text-gray-600 space-x-4">
              <Link href="/">Home</Link>
              <span className="opacity-60 cursor-default">Help</span>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        <footer className="text-center text-xs text-gray-500 pb-8">
          © {new Date().getFullYear()} E-Voting Demo — For testing only
        </footer>
      </body>
    </html>
  );
}


