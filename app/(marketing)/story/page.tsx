import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="py-12 sm:py-20 space-y-24">
      {/* Editorial Header */}
      <Container>
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            The Maison Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#111111] leading-tight">
            The Philosophy of Permanence
          </h1>
          <p className="text-base sm:text-lg text-[#666666] font-light leading-relaxed">
            Founded with a singular mission: to safeguard the noble arts of mechanical horology, ancestral leather saddlery, and bespoke architectural sanctuaries against the tide of ephemeral mass consumption.
          </p>
        </div>
      </Container>

      {/* Chapter 1: The Horological Atelier */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#E5E2DB]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Chapter I • Vallée de Joux, Switzerland
              </span>
              <h2 className="text-3xl font-serif text-[#111111]">
                Astronomical Precision & Hand Guilloché
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                In the serene valleys of the Swiss Jura mountains, master watchmakers hand-finish every chamfer, bridge, and balance wheel. Our tri-axial tourbillons and instantaneous perpetual calendars represent the absolute pinnacle of human micro-mechanical ingenuity.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                We produce fewer than 50 mechanical movements annually, ensuring each creation undergoes six months of rigorous chronometric observation before receiving its certificate of origin.
              </p>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] bg-[#F4F1EA] border border-[#E5E2DB] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85"
                alt="Swiss Jura Horology Atelier"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 2: The Tuscan Tannery */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 relative aspect-[4/3] sm:aspect-[16/10] bg-[#F4F1EA] border border-[#E5E2DB] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85"
                alt="Tuscan Leather Artisan"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Chapter II • Florence, Italy
              </span>
              <h2 className="text-3xl font-serif text-[#111111]">
                Vegetable-Tanned Vachetta & Saddle Stitches
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Our leather goods originate from certified full-grain hides tanned slowly over 60 days using organic chestnut and mimosa extracts. Saddle-stitched by hand with double-waxed linen cord, our briefcases and luggage are built to acquire a luminous amber patina across generations.
              </p>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Hardware is forged from solid brass ingots, finished with scratch-resistant ruthenium PVD coating, and guaranteed for a lifetime of international voyage.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Chapter 3: Private Architectural Sanctuaries */}
      <section className="bg-[#111111] text-[#FAFAFA] py-20 border-t border-[#262626]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Chapter III • Kyoto & The Alps
              </span>
              <h2 className="text-3xl font-serif text-[#FAFAFA]">
                Sanctuaries of Uninterrupted Solitude
              </h2>
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed font-light">
                Luxury is time, silence, and untouched space. AereoStack manages secluded architectural residences reserved exclusively for our private patrons.
              </p>
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed font-light">
                From a restored sukiya-style villa in the Arashiyama bamboo forest to a cedarwood chalet high above the Swiss clouds, our concierge orchestrates every moment with discreet grace.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#FAFAFA]"
                >
                  <span>Request Private Salon Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 relative aspect-[4/3] bg-[#222222] border border-[#333333] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85"
                alt="Kyoto Sanctuary Architecture"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
