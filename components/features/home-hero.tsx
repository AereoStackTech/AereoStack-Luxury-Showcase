'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { cn } from '@/lib/utils';

export function HomeHero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#111111] text-[#FAF9F6]">
      {/* Background Image with Muted Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85"
          alt="Maison AereoStack Hero Craft"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#111111]/40 to-[#111111]" />
      </div>

      <Container className="relative z-10 py-20 text-center flex flex-col items-center">
        {/* Subtle Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C5A880]/40 bg-[#111111]/80 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            {t('hero.badge', 'Autumn / Winter 2026 Collection')}
          </span>
        </div>

        {/* High-Contrast Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.08] max-w-5xl text-[#FAFAFA] font-normal">
          {t('hero.title.line1', 'Where Masterwork')}{' '}
          <br className="hidden sm:inline" />
          {t('hero.title.line2', 'Transcends Time')}
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-[#B3B3B3] max-w-2xl font-light leading-relaxed">
          {t(
            'hero.subtitle',
            'An uncompromising sanctuary of haute horlogerie, Tuscan leathercraft, and private architectural retreats. Crafted for those who measure value in generations.'
          )}
        </p>

        {/* Hero CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <Link
            href="/catalog"
            id="hero-explore-catalog-btn"
            className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#B3956D] text-[#111111] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-[#C5A880]"
          >
            <span>{t('hero.cta.explore', 'Explore Curations')}</span>
            <ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} />
          </Link>
          <Link
            href="/contact"
            id="hero-private-consultation-btn"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#FAF9F6]/10 text-[#FAF9F6] text-xs tracking-[0.2em] uppercase transition-all duration-300 border border-[#FAF9F6]/40 flex items-center justify-center gap-2"
          >
            <span>{t('hero.cta.consult', 'Request Consultation')}</span>
            <ArrowUpRight
              className={cn('w-4 h-4 text-[#C5A880]', isRTL && '-scale-x-100')}
            />
          </Link>
        </div>

        {/* Atelier Footprint Note */}
        <div className="mt-16 pt-8 border-t border-[#333333]/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] uppercase tracking-[0.25em] text-[#888888]">
          <span>{t('hero.foot.1', 'Swiss Astronomical Calibres')}</span>
          <span className="text-[#444444]">&bull;</span>
          <span>{t('hero.foot.2', 'Full-Grain Tuscan Tanning')}</span>
          <span className="text-[#444444]">&bull;</span>
          <span>{t('hero.foot.3', 'Kyoto & Alpine Sanctuaries')}</span>
        </div>
      </Container>
    </section>
  );
}
