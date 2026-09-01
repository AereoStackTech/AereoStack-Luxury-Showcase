'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuickInquiryModal } from './quick-inquiry-modal';
import type { LuxuryProductItem, LuxuryCategory } from '@/lib/db';
import { cn } from '@/lib/utils';

export function CatalogGrid({
  initialProducts,
  categories,
  selectedCategorySlug = 'all',
}: {
  initialProducts: LuxuryProductItem[];
  categories: LuxuryCategory[];
  selectedCategorySlug?: string;
}) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'featured' | 'price-desc' | 'price-asc' | 'title'>('featured');
  const [inquiryProduct, setInquiryProduct] = React.useState<LuxuryProductItem | null>(null);

  const activeCategory = selectedCategory ?? selectedCategorySlug;
  const setActiveCategory = (slug: string) => setSelectedCategory(slug);

  const filteredProducts = React.useMemo(() => {
    let list = [...initialProducts];

    // Filter by Category
    if (activeCategory !== 'all') {
      const targetCategory = categories.find((c) => c.slug === activeCategory);
      if (targetCategory) {
        list = list.filter((p) => p.categoryId === targetCategory.id);
      }
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
          (p.materials && p.materials.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // featured first
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [initialProducts, activeCategory, searchQuery, sortBy, categories]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full space-y-12">
      {/* Filters and Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E2DB]">
        {/* Category Pills / Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-200 border',
              activeCategory === 'all'
                ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                : 'bg-[#FFFFFF] text-[#666666] border-[#E5E2DB] hover:border-[#111111] hover:text-[#111111]'
            )}
          >
            All Creations ({initialProducts.length})
          </button>
          {categories.map((cat) => {
            const count = initialProducts.filter((p) => p.categoryId === cat.id).length;
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  'px-4 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-200 border',
                  isSelected
                    ? 'bg-[#111111] text-[#FAF9F6] border-[#111111]'
                    : 'bg-[#FFFFFF] text-[#666666] border-[#E5E2DB] hover:border-[#111111] hover:text-[#111111]'
                )}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full pl-10 pr-4 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111111] placeholder:text-[#888888] focus:outline-none focus:border-[#111111]"
            />
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="h-10 px-3 bg-[#FFFFFF] border border-[#E5E2DB] text-xs uppercase tracking-wider text-[#111111] focus:outline-none focus:border-[#111111]"
          >
            <option value="featured">Curator&apos;s Choice</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#E5E2DB] bg-[#FFFFFF] p-8 flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border border-[#E5E2DB] flex items-center justify-center text-[#737373] text-lg font-serif">
            Æ
          </div>
          <h3 className="text-xl font-serif text-[#111111]">
            No Masterpieces Matched
          </h3>
          <p className="text-xs text-[#737373] max-w-sm leading-relaxed">
            We could not find items matching your specific search filters. Our atelier also crafts bespoke commissions tailored to your specific requirements.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
          >
            Reset Catalog Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => {
              const primaryImg = product.images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85';
              const secondaryImg = product.images[1] || primaryImg;

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group flex flex-col bg-[#FFFFFF] border border-[#E5E2DB] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#C5A880]/60"
                >
                  {/* Image Presentation */}
                  <Link
                    href={`/catalog/${product.slug}`}
                    className="relative aspect-[4/5] bg-[#F4F1EA] overflow-hidden block"
                  >
                    <Image
                      src={primaryImg}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"
                      referrerPolicy="no-referrer"
                    />
                    <Image
                      src={secondaryImg}
                      alt={`${product.title} Alternate View`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Featured Ribbon */}
                    {product.isFeatured && (
                      <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#111111] text-[#C5A880] text-[10px] uppercase tracking-[0.2em] font-medium border border-[#C5A880]/30">
                        Featured Piece
                      </div>
                    )}

                    {/* Category Label */}
                    {product.category && (
                      <div className="absolute bottom-4 left-4 z-10 px-2.5 py-1 bg-[#FAF9F6]/90 backdrop-blur-sm text-[#111111] text-[10px] uppercase tracking-[0.18em] font-medium border border-[#E5E2DB]">
                        {product.category.name}
                      </div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <Link href={`/catalog/${product.slug}`}>
                          <h3 className="font-serif text-xl sm:text-2xl text-[#111111] group-hover:text-[#C5A880] transition-colors leading-snug">
                            {product.title}
                          </h3>
                        </Link>
                      </div>

                      {product.subtitle && (
                        <p className="text-xs uppercase tracking-wider text-[#737373] font-light">
                          {product.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Actions */}
                    <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-[#888888]">
                          Acquisition Value
                        </span>
                        <span className="font-serif text-lg font-medium text-[#111111]">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInquiryProduct(product)}
                          title="Quick Consultation Request"
                          className="p-2 border border-[#E5E2DB] hover:border-[#111111] hover:bg-[#111111] hover:text-[#FAF9F6] text-[#111111] transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/catalog/${product.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#111111] text-[#FAF9F6] hover:bg-[#262626] text-[11px] uppercase tracking-widest transition-colors font-medium"
                        >
                          <span>Explore</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        product={inquiryProduct}
        open={!!inquiryProduct}
        onOpenChange={(open) => {
          if (!open) setInquiryProduct(null);
        }}
      />
    </div>
  );
}
