import * as React from 'react';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111111]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
