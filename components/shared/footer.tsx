import * as React from 'react';
import Link from 'next/link';
import { Container } from './container';
import { Shield, Sparkles, Compass, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="main-footer" className="bg-[#111111] text-[#FAFAFA] pt-20 pb-12 mt-auto border-t border-[#222222]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#262626]">
          {/* Brand Philosophy */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center text-[#C5A880] font-serif text-sm">
                Æ
              </div>
              <span className="font-serif text-xl tracking-[0.25em] text-[#FAFAFA] uppercase">
                AEREOSTACK
              </span>
            </div>
            <p className="text-sm text-[#999999] leading-relaxed max-w-sm font-light">
              An atelier dedicated to uncompromising craftsmanship, sidereal horology, noble leatherwork, and secluded architectural sanctuaries. Every creation is an heirloom designed for timeless permanence.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-[#C5A880] tracking-widest uppercase">
              <span>Zurich</span>
              <span className="text-[#444444]">•</span>
              <span>London</span>
              <span className="text-[#444444]">•</span>
              <span>Kyoto</span>
            </div>
          </div>

          {/* Maison Links */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              Collections
            </h4>
            <ul className="flex flex-col space-y-3 text-xs tracking-wider text-[#999999]">
              <li>
                <Link href="/catalog?category=haute-horlogerie" className="hover:text-[#FAFAFA] transition-colors">
                  Haute Horlogerie
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=maison-leathercraft" className="hover:text-[#FAFAFA] transition-colors">
                  Maison Leathercraft
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=private-sanctuary-journeys" className="hover:text-[#FAFAFA] transition-colors">
                  Sanctuary Journeys
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[#FAFAFA] transition-colors">
                  Complete Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Relations */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              Sanctuary Care
            </h4>
            <ul className="flex flex-col space-y-3 text-xs tracking-wider text-[#999999]">
              <li>
                <Link href="/story" className="hover:text-[#FAFAFA] transition-colors">
                  Artisanal Heritage
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FAFAFA] transition-colors">
                  Client FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FAFAFA] transition-colors">
                  Private Salon Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FAFAFA] transition-colors flex items-center gap-1">
                  Curator Access <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Salons & Private Concierge */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
              Private Concierge
            </h4>
            <p className="text-xs text-[#999999] leading-relaxed">
              For private viewings, confidential acquisitions, or bespoke aviation logistics:
            </p>
            <a
              href="mailto:concierge@aereostack.com"
              className="text-sm font-serif text-[#FAFAFA] hover:text-[#C5A880] transition-colors"
            >
              concierge@aereostack.com
            </a>
            <span className="text-xs text-[#666666] tracking-wider">
              +41 22 819 0044 • 24/7 Dedicated Client Desk
            </span>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666666] tracking-wider gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 AEREOSTACK MAISON S.A. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>DISCREET LUXURY ARCHITECTURE</span>
            <span className="text-[#333333]">•</span>
            <span>PRISMA & NEXT.JS APP ROUTER</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
