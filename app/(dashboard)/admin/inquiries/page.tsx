import * as React from 'react';
import { luxuryDb } from '@/lib/db';
import { AdminInquiryTable } from '@/components/features/admin-inquiry-table';

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const inquiries = await luxuryDb.getInquiries();

  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-4 border-b border-[#E5E2DB]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
          Client Dossiers
        </span>
        <h1 className="text-3xl font-serif text-[#111111]">
          Inquiries & Bespoke Consultations
        </h1>
        <p className="text-xs text-[#737373]">
          Review incoming patronage inquiries, assign dedicated advisors, record internal notes, and update consultation milestones.
        </p>
      </div>

      <AdminInquiryTable initialInquiries={inquiries} />
    </div>
  );
}
