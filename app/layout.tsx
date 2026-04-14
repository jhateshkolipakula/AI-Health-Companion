import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MediSpend Clone | Compliance Software for Life Sciences',
  description: 'Next.js + TypeScript clone experience with enterprise-style compliance UI.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
