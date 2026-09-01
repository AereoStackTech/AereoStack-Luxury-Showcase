import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/shared/container';
import { ProductGallery } from '@/components/features/product-gallery';
import { InquiryForm } from '@/components/features/inquiry-form';
import { luxuryDb } from '@/lib/db';
import { ShieldCheck, Truck, Clock, Sparkles, ChevronRight, Award } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await luxuryDb.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await luxuryDb.getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const specs = product.specifications && typeof product.specifications === 'object'
    ? (product.specifications as Record<string, string>)
    : null;

  return (
    <div className="py-10 sm:py-16 space-y-20">
      <Container className="space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#737373]">
          <Link href="/" className="hover:text-[#111111] transition-colors">
            Maison
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-[#111111] transition-colors">
            Collections
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={`/catalog?category=${product.category.slug}`}
                className="hover:text-[#111111] transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#111111] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: High-Res Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right Column: Piece Details & Acquisition Panel */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-[#E5E2DB]">
              {product.category && (
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-xs uppercase tracking-widest text-[#737373]">
                  {product.subtitle}
                </p>
              )}
              <div className="pt-3 flex items-baseline gap-4">
                <span className="text-2xl sm:text-3xl font-serif font-medium text-[#111111]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#888888]">
                  Excl. bespoke duties
                </span>
              </div>
            </div>

            {/* Description Narrative */}
            <div className="space-y-3 text-xs sm:text-sm text-[#444444] leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Materials & Lead Time Badges */}
            <div className="space-y-3 p-4 bg-[#FFFFFF] border border-[#E5E2DB] text-xs">
              {product.materials && (
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                      Artisanal Materials
                    </span>
                    <span className="text-[#111111] font-medium">{product.materials}</span>
                  </div>
                </div>
              )}
              {product.leadTime && (
                <div className="flex items-start gap-2 pt-2 border-t border-[#E5E2DB]">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                      Lead Time / Availability
                    </span>
                    <span className="text-[#111111] font-medium">{product.leadTime}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Specifications */}
            {specs && Object.keys(specs).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#111111]">
                  Technical Specifications
                </h3>
                <dl className="divide-y divide-[#E5E2DB] border-y border-[#E5E2DB] text-xs">
                  {Object.entries(specs).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-4">
                      <dt className="text-[#737373] uppercase tracking-wider text-[11px]">{key}</dt>
                      <dd className="font-medium text-[#111111] text-right">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Trust and Assurance Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#666666]">
              <div className="flex items-center gap-2 p-3 bg-[#FFFFFF] border border-[#E5E2DB]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Certificate of Origin</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-[#FFFFFF] border border-[#E5E2DB]">
                <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Insured Armored Transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Private Consultation & Commission Form Section */}
        <div className="pt-16 border-t border-[#E5E2DB]">
          <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Confidential Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#111111]">
                  Acquire or Request Private Viewing
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Submit a tailored request regarding &ldquo;{product.title}&rdquo;. Our concierge will arrange private presentation logistics or prepare bespoke customization sketches.
                </p>
                <div className="pt-4 p-4 bg-[#FAF9F6] border border-[#E5E2DB] space-y-2 text-xs text-[#555555]">
                  <div className="font-serif text-[#111111] font-medium">Direct Salon Desk</div>
                  <div>Zurich Atelier: +41 22 819 0044</div>
                  <div>London Salon: +44 20 7946 0912</div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InquiryForm
                  productItemId={product.id}
                  productTitle={product.title}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#E5E2DB] space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#111111]">
                Related Masterpieces
              </h2>
              <Link
                href="/catalog"
                className="text-xs uppercase tracking-widest text-[#737373] hover:text-[#111111]"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/catalog/${rel.slug}`}
                  className="group bg-[#FFFFFF] border border-[#E5E2DB] overflow-hidden hover:border-[#C5A880] transition-colors"
                >
                  <div className="relative aspect-[4/5] bg-[#F4F1EA] overflow-hidden">
                    <Image
                      src={rel.images[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=85'}
                      alt={rel.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="font-serif text-base text-[#111111] group-hover:text-[#C5A880] transition-colors">
                      {rel.title}
                    </h3>
                    <div className="text-xs font-medium text-[#737373]">
                      ${rel.price.toLocaleString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
