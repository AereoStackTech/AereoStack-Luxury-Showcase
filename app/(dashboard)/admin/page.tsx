import * as React from 'react';
import Link from 'next/link';
import { luxuryDb } from '@/lib/db';
import { AdminInquiryTable } from '@/components/features/admin-inquiry-table';
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [inquiries, products, categories, faqs] = await Promise.all([
    luxuryDb.getInquiries(),
    luxuryDb.getProducts(),
    luxuryDb.getCategories(),
    luxuryDb.getFAQs(),
  ]);

  const pendingInquiries = inquiries.filter((i) => i.status === 'PENDING');
  const reviewedInquiries = inquiries.filter((i) => i.status === 'REVIEWED');
  const resolvedInquiries = inquiries.filter((i) => i.status === 'RESOLVED');

  const totalCatalogValue = products.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E2DB]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            Maison Administration
          </span>
          <h1 className="text-3xl font-serif text-[#111111]">
            Curator Command Center
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalog"
            className="px-4 py-2 bg-[#111111] text-[#FAF9F6] hover:bg-[#262626] text-xs uppercase tracking-wider font-medium transition-colors"
          >
            Manage Catalog & FAQs
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Inquiries */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] font-medium">
              Awaiting Review
            </span>
            <Clock className="w-4 h-4 text-[#B45309]" />
          </div>
          <div className="font-serif text-3xl text-[#111111]">
            {pendingInquiries.length}
          </div>
          <p className="text-[11px] text-[#737373]">
            {pendingInquiries.length > 0
              ? 'Urgent client response requested'
              : 'All client requests up to date'}
          </p>
        </div>

        {/* Total Inquiries */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] font-medium">
              Total Inquiries
            </span>
            <MessageSquare className="w-4 h-4 text-[#111111]" />
          </div>
          <div className="font-serif text-3xl text-[#111111]">
            {inquiries.length}
          </div>
          <p className="text-[11px] text-[#737373]">
            {resolvedInquiries.length} concluded successfully
          </p>
        </div>

        {/* Catalog Masterpieces */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] font-medium">
              Active Creations
            </span>
            <Package className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="font-serif text-3xl text-[#111111]">
            {products.length}
          </div>
          <p className="text-[11px] text-[#737373]">
            Across {categories.length} curated categories
          </p>
        </div>

        {/* Total Showcase Value */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#737373] font-medium">
              Total Catalog Value
            </span>
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl text-[#111111]">
            ${(totalCatalogValue / 1000).toFixed(0)}k USD
          </div>
          <p className="text-[11px] text-[#737373]">
            Estimated valuation of curations
          </p>
        </div>
      </div>

      {/* Inquiries Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-[#111111]">
            Client Consultations & Requests
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider text-[#737373] hover:text-[#111111] flex items-center gap-1"
          >
            <span>View Full Inquiry Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <AdminInquiryTable initialInquiries={inquiries} />
      </div>
    </div>
  );
}
