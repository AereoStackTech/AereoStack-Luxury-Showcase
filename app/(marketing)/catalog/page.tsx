import * as React from 'react';
import { Container } from '@/components/shared/container';
import { CatalogGrid } from '@/components/features/catalog-grid';
import { luxuryDb } from '@/lib/db';

export const revalidate = 0;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCategorySlug = resolvedParams?.category || 'all';

  const [products, categories] = await Promise.all([
    luxuryDb.getProducts(),
    luxuryDb.getCategories(),
  ]);

  return (
    <div className="py-12 sm:py-20">
      <Container className="space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            Maison Registry
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111111]">
            Curated Collections
          </h1>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Discover precision horology, Tuscan leather heirlooms, and bespoke architectural sanctuaries. Each piece is crafted in limited numbers and available through private consultation.
          </p>
        </div>

        {/* Interactive Filterable Catalog Grid */}
        <CatalogGrid
          initialProducts={products}
          categories={categories}
          selectedCategorySlug={selectedCategorySlug}
        />
      </Container>
    </div>
  );
}
