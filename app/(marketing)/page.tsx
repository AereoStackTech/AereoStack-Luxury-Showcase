import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/container';
import { luxuryDb } from '@/lib/db';
import { CatalogGrid } from '@/components/features/catalog-grid';
import { InquiryForm } from '@/components/features/inquiry-form';
import { ArrowUpRight, ArrowRight, ShieldCheck, Compass, Sparkles, Clock, Star } from 'lucide-react';

export const revalidate = 0; // Dynamic server rendering for live catalog & inquiry updates

export default async function HomePage() {
  const [products, categories, testimonials] = await Promise.all([
    luxuryDb.getProducts(),
    luxuryDb.getCategories(),
    luxuryDb.getTestimonials(),
  ]);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-36 pb-24">
      {/* 1. Immersive Editorial Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#111111] text-[#FAF9F6]">
        {/* Background Image with Muted Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85"
            alt="Maison AereoStack Hero Craft"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#111111]/40 to-[#111111]" />
        </div>

        <Container className="relative z-10 py-20 text-center flex flex-col items-center">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#C5A880]/40 bg-[#111111]/80 backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Autumn / Winter 2026 Collection
            </span>
          </div>

          {/* High-Contrast Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-[1.08] max-w-5xl text-[#FAFAFA] font-normal">
            Where Masterwork <br className="hidden sm:inline" />
            Transcends Time
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-base sm:text-lg md:text-xl text-[#B3B3B3] max-w-2xl font-light leading-relaxed">
            An uncompromising sanctuary of haute horlogerie, Tuscan leathercraft, and private architectural retreats. Crafted for those who measure value in generations.
          </p>

          {/* Hero CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <Link
              href="/catalog"
              id="hero-explore-catalog-btn"
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] hover:bg-[#B3956D] text-[#111111] font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 border border-[#C5A880]"
            >
              <span>Explore Curations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              id="hero-private-consultation-btn"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#FAF9F6]/10 text-[#FAF9F6] text-xs tracking-[0.2em] uppercase transition-all duration-300 border border-[#FAF9F6]/40 flex items-center justify-center gap-2"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
            </Link>
          </div>

          {/* Atelier Footprint Note */}
          <div className="mt-16 pt-8 border-t border-[#333333]/80 flex flex-wrap items-center justify-center gap-8 text-[11px] uppercase tracking-[0.25em] text-[#888888]">
            <span>Swiss Astronomical Calibres</span>
            <span className="text-[#444444]">•</span>
            <span>Full-Grain Tuscan Tanning</span>
            <span className="text-[#444444]">•</span>
            <span>Kyoto & Alpine Sanctuaries</span>
          </div>
        </Container>
      </section>

      {/* 2. Maison Pillars (Editorial Three-Column) */}
      <section className="relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Pillar 1 */}
            <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#C5A880]/60 transition-colors">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  01 / Precision
                </span>
                <h3 className="font-serif text-2xl text-[#111111]">
                  Haute Horlogerie
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Hand-finished tourbillons, perpetual calendars, and sidereal movements assembled in our Vallée de Joux atelier. Accurate to within seconds per century.
                </p>
              </div>
              <Link
                href="/catalog?category=haute-horlogerie"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#111111] hover:text-[#C5A880] transition-colors"
              >
                <span>View Timepieces</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#C5A880]/60 transition-colors">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  02 / Permanence
                </span>
                <h3 className="font-serif text-2xl text-[#111111]">
                  Maison Leathercraft
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Sculpted from uninterrupted full-grain French and Tuscan hides, stitched using double-waxed linen thread and reinforced with ruthenium-coated brass.
                </p>
              </div>
              <Link
                href="/catalog?category=maison-leathercraft"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#111111] hover:text-[#C5A880] transition-colors"
              >
                <span>View Leather Goods</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#C5A880]/60 transition-colors">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  03 / Sanctuary
                </span>
                <h3 className="font-serif text-2xl text-[#111111]">
                  Architectural Retreats
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Exclusive private estates in Kyoto, the Engadin Valley, and the Amalfi cliffs. Curated private flight connections, dedicated master chefs, and absolute discretion.
                </p>
              </div>
              <Link
                href="/catalog?category=private-sanctuary-journeys"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#111111] hover:text-[#C5A880] transition-colors"
              >
                <span>Discover Retreats</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Featured Masterpieces / Catalog Grid Preview */}
      <section className="relative">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
                Curated Inventory
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#111111]">
                Masterpieces on Display
              </h2>
            </div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#C5A880] transition-colors"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <CatalogGrid
            initialProducts={products}
            categories={categories}
          />
        </Container>
      </section>

      {/* 4. Atelier Story & Manifesto */}
      <section className="bg-[#111111] text-[#FAFAFA] py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Editorial Image */}
            <div className="lg:col-span-6 relative aspect-[4/5] bg-[#222222] overflow-hidden border border-[#333333]">
              <Image
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85"
                alt="Atelier Craftsmanship"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#111111]/90 backdrop-blur-sm border border-[#333333]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880]">
                  Vallée de Joux & Florence
                </p>
                <p className="text-xs text-[#B3B3B3] mt-1">
                  Over 1,200 hours of hand polishing and guilloché finishing per commission.
                </p>
              </div>
            </div>

            {/* Narrative Copy */}
            <div className="lg:col-span-6 space-y-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                Maison Manifesto
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight">
                Refusing the ephemeral. <br />
                Crafting for permanence.
              </h2>
              <p className="text-sm sm:text-base text-[#AAAAAA] font-light leading-relaxed">
                In an era dominated by rapid mass manufacturing, AereoStack was founded on the radical premise of unhurried perfection. We work exclusively with master artisans whose lineages date back centuries.
              </p>
              <p className="text-sm sm:text-base text-[#AAAAAA] font-light leading-relaxed">
                Whether regulating a grand complication tourbillon or hand-waxing full-grain leather edges with natural beeswax, no step is hurried, and no compromise is permitted.
              </p>

              <div className="pt-4 flex items-center gap-8 border-t border-[#262626]">
                <div>
                  <div className="text-2xl font-serif text-[#C5A880]">18</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#777777] mt-1">
                    Annual Complications
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-serif text-[#C5A880]">100%</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#777777] mt-1">
                    Noble Provenance
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-serif text-[#C5A880]">10 Yrs</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#777777] mt-1">
                    Manufacture Warranty
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/story"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#FAFAFA] transition-colors"
                >
                  <span>Read The Full Heritage Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Client Testimonials */}
      <section className="relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#111111]">
              In the Words of Our Patrons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] flex flex-col justify-between space-y-6"
              >
                <div className="flex items-center gap-1 text-[#C5A880]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                  ))}
                </div>
                <blockquote className="font-serif text-base sm:text-lg text-[#222222] italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-[#E5E2DB]">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#111111]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-[#737373] mt-0.5">
                    {t.roleOrPublication}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Private Consultation Request Section */}
      <section className="relative">
        <Container>
          <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-16 lg:p-20 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Private Consultation
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#111111] leading-tight">
                  Commission Your Masterpiece
                </h2>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Whether acquiring an existing creation, initiating a bespoke commission, or curating a private sanctuary voyage, our senior advisors offer discreet, tailored counsel.
                </p>
                <div className="space-y-4 pt-4 text-xs text-[#444444]">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Encrypted client confidentiality and NDA compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Concierge response guaranteed within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Private salon appointments in Zurich, London, and Tokyo</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <InquiryForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
