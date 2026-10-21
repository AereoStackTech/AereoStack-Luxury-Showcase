import * as React from 'react';
import { Container } from '@/components/shared/container';
import { CatalogGrid } from '@/components/features/catalog-grid';
import { CatalogHeader } from '@/components/features/catalog-header';
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
        <CatalogHeader />

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
