import * as React from 'react';
import { luxuryDb } from '@/lib/db';
import { AdminCatalogManager } from '@/components/features/admin-catalog-manager';

export const revalidate = 0;

export default async function AdminCatalogPage() {
  const [products, categories, faqs] = await Promise.all([
    luxuryDb.getProducts(),
    luxuryDb.getCategories(),
    luxuryDb.getFAQs(),
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-2 pb-4 border-b border-[#E5E2DB]">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
          Inventory & Content
        </span>
        <h1 className="text-3xl font-serif text-[#111111]">
          Catalog & FAQ Management
        </h1>
        <p className="text-xs text-[#737373]">
          Commission new creations, edit specifications, publish high-resolution visual assets, and update client guidance FAQs.
        </p>
      </div>

      <AdminCatalogManager
        products={products}
        categories={categories}
        faqs={faqs}
      />
    </div>
  );
}
