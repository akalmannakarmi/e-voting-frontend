import './globals.css';

export const metadata = {
  title: 'E-Voting',
  description: 'Secure e-voting platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <header className="bg-white shadow p-4 text-xl font-bold text-center">E-Voting</header>
        <main>{children}</main>
      </body>
    </html>
  );
}

