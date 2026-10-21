import * as React from 'react';
import { Container } from '@/components/shared/container';
import { FAQAccordion } from '@/components/features/faq-accordion';
import { luxuryDb } from '@/lib/db';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, Clock, ArrowRight } from 'lucide-react';

import { FAQHeader } from '@/components/features/faq-header';

export const revalidate = 0;

export default async function FAQPage() {
  const faqs = await luxuryDb.getFAQs();

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <Container className="space-y-12">
        {/* Header */}
        <FAQHeader />

        {/* FAQs Accordion */}
        <div className="bg-[#FFFFFF] p-8 sm:p-12 border border-[#E5E2DB] shadow-sm max-w-4xl">
          <FAQAccordion faqs={faqs} />
        </div>

        {/* Direct Contact Card */}
        <div className="bg-[#111111] text-[#FAFAFA] p-8 sm:p-12 border border-[#262626] max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-[#FAFAFA]">
              Require Further Discretion or Bespoke Assistance?
            </h3>
            <p className="text-xs text-[#999999] leading-relaxed max-w-md font-light">
              Our Senior Client Advisors in Zurich, London, and Tokyo are available for confidential consultations.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#C5A880] text-[#111111] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#B3956D] transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Consult Concierge</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
