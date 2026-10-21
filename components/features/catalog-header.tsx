'use client';

import * as React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';

export function CatalogHeader() {
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl space-y-4">
      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
        {t('catalog.header.tag', 'Maison Registry')}
      </span>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111111]">
        {t('catalog.header.title', 'Curated Collections')}
      </h1>
      <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
        {t(
          'catalog.header.desc',
          'Discover precision horology, Tuscan leather heirlooms, and bespoke architectural sanctuaries. Each piece is crafted in limited numbers and available through private consultation.'
        )}
      </p>
    </div>
  );
}
