'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { cn } from '@/lib/utils';

export function StoryContent() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="py-12 sm:py-20 space-y-24">
      {/* Editorial Header */}
      <Container>
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            {t('story.hero.tag', 'Generational Provenance')}
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#111111] leading-tight">
            {t('story.hero.title', 'The Philosophy of Permanence')}
          </h1>
          <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
            {t(
              'story.hero.desc',
              'Founded on the principle that true luxury exists only where time, patience, and uncompromising mastery converge without haste.'
            )}
          </p>
        </div>
      </Container>

      {/* Chapter 1: The Horological Atelier */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#E5E2DB]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                {t('story.chap1.tag', 'Chapter I / The Horological Discipline')}
              </span>
              <h2 className="text-3xl font-serif text-[#111111]">
                {t('story.chap1.title', 'Mastering Astronomical Time')}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {t(
                  'story.chap1.desc',
                  'Our master watchmakers work in high-altitude Jura ateliers where stillness and humidity are controlled down to the decimal point.'
                )}
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                We produce fewer than 50 mechanical movements annually, ensuring each creation undergoes six months of rigorous chronometric observation before receiving its certificate of origin.
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] bg-[#F4F1EA] border border-[#E5E2DB] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"
                alt="Swiss Jura Horology Atelier"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 2: The Tuscan Tannery */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 relative aspect-[4/3] sm:aspect-[16/10] bg-[#F4F1EA] border border-[#E5E2DB] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
                alt="Tuscan Leather Artisan"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                {t('story.chap2.tag', 'Chapter II / The Tuscan Tanneries')}
              </span>
              <h2 className="text-3xl font-serif text-[#111111]">
                {t('story.chap2.title', 'Hides of Historical Nobility')}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {t(
                  'story.chap2.desc',
                  'Using tree bark extracts, mimosa pods, and chestnut tannins aged in oak vats for sixty days, creating leathers that grow richer over decades.'
                )}
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Hardware is forged from solid brass ingots, finished with scratch-resistant ruthenium PVD coating, and guaranteed for a lifetime of international voyage.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 3: Private Architectural Sanctuaries */}
      <section className="bg-[#111111] text-[#FAFAFA] py-20 border-t border-[#262626]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                {t('story.chap3.tag', 'Chapter III / Sanctuary Architecture')}
              </span>
              <h2 className="text-3xl font-serif text-[#FAFAFA]">
                {t('story.chap3.title', 'Silent Sanctuaries for the Mind')}
              </h2>
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed font-light">
                {t(
                  'story.chap3.desc',
                  'From minimalist cedar villas in Kyoto to cantilevered granite lodges in the Engadine, our architectural retreats offer profound seclusion.'
                )}
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#FAFAFA] transition-colors"
                >
                  <span>{t('nav.contact', 'Request Private Salon Consultation')}</span>
                  <ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] bg-[#222222] border border-[#333333] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
                alt="Kyoto Sanctuary Architecture"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
