'use client';

import * as React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';

export function ContactHeader() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl space-y-4">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
        {t('contact.hero.tag', 'Private Client Relations')}
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif text-[#111111]">
        {t('contact.hero.title', 'Request a Private Consultation')}
      </h1>
      <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
        {t(
          'contact.hero.desc',
          'Initiate a confidential acquisition, schedule an exclusive salon viewing, or discuss bespoke commission requirements with our lead curators.'
        )}
      </p>
    </div>
  );
}
