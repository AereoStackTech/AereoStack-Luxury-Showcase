'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { cn } from '@/lib/utils';

export function HomePillars() {
  const { t, isRTL } = useLanguage();

  const pillars = [
    {
      num: t('pillar.1.number', '01 / Precision'),
      title: 'Haute Horlogerie',
      subtitle: t('pillar.1.title', 'Mechanical Sovereignty'),
      desc: t(
        'pillar.1.desc',
        'Every movement is calibrated to sidereal celestial benchmarks, hand-beveled with diamond pastes over hundreds of artisan hours.'
      ),
      linkText: t('catalog.product.viewPiece', 'View Timepieces'),
      href: '/catalog?category=haute-horlogerie',
    },
    {
      num: t('pillar.2.number', '02 / Provenance'),
      title: 'Maison Leathercraft',
      subtitle: t('pillar.2.title', 'Noble Organic Materials'),
      desc: t(
        'pillar.2.desc',
        'Rare vegetable-tanned hides from Florence, certified conflict-free gold alloys, and ethically preserved sustainably sourced timbers.'
      ),
      linkText: t('catalog.product.viewPiece', 'View Leather Goods'),
      href: '/catalog?category=maison-leathercraft',
    },
    {
      num: t('pillar.3.number', '03 / Permanence'),
      title: 'Architectural Retreats',
      subtitle: t('pillar.3.title', 'Centuries of Horizon'),
      desc: t(
        'pillar.3.desc',
        'Acquisitions backed by lifetime provenance archival certificates and direct curator access for generational restoration.'
      ),
      linkText: t('catalog.product.viewPiece', 'Discover Retreats'),
      href: '/catalog?category=private-sanctuary-journeys',
    },
  ];

  return (
    <section className="relative">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#C5A880]/60 transition-colors"
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-2xl text-[#111111]">
                  {pillar.title}
                </h3>
                <h4 className="text-xs uppercase tracking-wider text-[#737373] font-medium">
                  {pillar.subtitle}
                </h4>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <Link
                href={pillar.href}
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#111111] hover:text-[#C5A880] transition-colors"
              >
                <span>{pillar.linkText}</span>
                <ArrowUpRight
                  className={cn('w-3.5 h-3.5', isRTL && '-scale-x-100')}
                />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
