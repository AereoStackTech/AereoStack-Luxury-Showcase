'use client';

import * as React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';

export function FAQHeader() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl space-y-4">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
        {t('faq.hero.tag', 'Client Services & Assurance')}
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif text-[#111111]">
        {t('faq.hero.title', 'Frequently Addressed Queries')}
      </h1>
      <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
        {t(
          'faq.hero.desc',
          'Detailed guidance regarding bespoke commissions, cryptographic provenance certification, white-glove armored transit, and lifelong atelier maintenance.'
        )}
      </p>
    </div>
  );
}
