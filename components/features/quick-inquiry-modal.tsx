'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { InquiryForm } from './inquiry-form';
import type { LuxuryProductItem } from '@/lib/db';
import { useLanguage } from '@/lib/i18n/language-context';

export function QuickInquiryModal({
  product,
  open,
  onOpenChange,
}: {
  product: LuxuryProductItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useLanguage();

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#FAF9F6] p-6 sm:p-10 border border-[#E5E2DB]">
        <DialogHeader>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
            {t('home.inquiry.tag', 'Bespoke Client Service')}
          </span>
          <DialogTitle className="text-2xl sm:text-3xl font-serif">
            {t('modal.inquire.title', 'Confidential Acquisition Request')}: {product.title}
          </DialogTitle>
          <DialogDescription>
            {t(
              'inquiry.form.subtitle',
              'Submit your private request or arrange an exclusive private viewing with our senior concierge desk.'
            )}
          </DialogDescription>
        </DialogHeader>

        <InquiryForm
          compact
          productItemId={product.id}
          productTitle={product.title}
          onSuccess={() => {
            setTimeout(() => onOpenChange(false), 2400);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
