'use client';

import * as React from 'react';
import { useLanguage } from '@/lib/i18n/language-context';

export function ProductPricing({ price }: { price: number }) {
  const { formatPrice, t } = useLanguage();

  return (
    <div className="pt-3 flex items-baseline gap-4">
      <span className="text-2xl sm:text-3xl font-serif font-medium text-[#111111]">
        {formatPrice(price)}
      </span>
      <span className="text-xs uppercase tracking-wider text-[#888888]">
        {t('catalog.product.priceFrom', 'Acquisition Value')}
      </span>
    </div>
  );
}
