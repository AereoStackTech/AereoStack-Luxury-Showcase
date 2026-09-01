import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Shield, LayoutDashboard, MessageSquare, Layers, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#111111]">
      {/* Top Curator Navbar */}
      <header className="bg-[#111111] text-[#FAFAFA] border-b border-[#222222] sticky top-0 z-40">
        <Container className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-6 h-6 border border-[#C5A880] flex items-center justify-center text-[#C5A880] text-[10px] font-serif">
                Æ
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm tracking-[0.2em] uppercase text-[#FAFAFA]">
                  AEREOSTACK
                </span>
                <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 bg-[#262626] text-[#C5A880] border border-[#C5A880]/30 font-medium">
                  Curator Desk
                </span>
              </div>
            </Link>

            {/* Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1 pl-6 border-l border-[#262626] text-xs uppercase tracking-wider">
              <Link
                href="/admin"
                className="px-3 py-1.5 text-[#CCCCCC] hover:text-[#FAFAFA] hover:bg-[#222222] transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Overview</span>
              </Link>
              <Link
                href="/admin/inquiries"
                className="px-3 py-1.5 text-[#CCCCCC] hover:text-[#FAFAFA] hover:bg-[#222222] transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Inquiries</span>
              </Link>
              <Link
                href="/admin/catalog"
                className="px-3 py-1.5 text-[#CCCCCC] hover:text-[#FAFAFA] hover:bg-[#222222] transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Catalog & FAQs</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-[#222222] hover:bg-[#333333] text-[#FAFAFA] tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>View Public Sanctuary</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>
          </div>
        </Container>
      </header>

      {/* Subnav for Mobile */}
      <div className="md:hidden bg-[#1A1A1A] border-b border-[#262626] text-xs">
        <Container className="py-2 flex items-center justify-around text-[11px] uppercase tracking-wider text-[#CCCCCC]">
          <Link href="/admin" className="py-1 hover:text-[#C5A880]">
            Overview
          </Link>
          <Link href="/admin/inquiries" className="py-1 hover:text-[#C5A880]">
            Inquiries
          </Link>
          <Link href="/admin/catalog" className="py-1 hover:text-[#C5A880]">
            Catalog & FAQs
          </Link>
        </Container>
      </div>

      {/* Main Admin Content */}
      <main className="flex-1 py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
