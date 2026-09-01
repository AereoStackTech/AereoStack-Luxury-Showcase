import * as React from 'react';
import { Container } from '@/components/shared/container';
import { InquiryForm } from '@/components/features/inquiry-form';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const salons = [
    {
      city: 'Zurich Atelier & Vault',
      address: 'Bahnhofstrasse 48, 8001 Zürich, Switzerland',
      phone: '+41 22 819 0044',
      email: 'zurich@aereostack.com',
      hours: 'By Private Appointment Only (Mon – Sat)',
    },
    {
      city: 'London Mayfair Salon',
      address: '14 Berkeley Square, Mayfair, London W1J 6BL, UK',
      phone: '+44 20 7946 0912',
      email: 'london@aereostack.com',
      hours: 'By Private Appointment Only (Mon – Fri)',
    },
    {
      city: 'Tokyo Ginza Residence',
      address: '6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan',
      phone: '+81 3 5555 0198',
      email: 'tokyo@aereostack.com',
      hours: 'By Private Appointment Only (Tue – Sun)',
    },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <Container className="space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            Private Client Relations
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#111111]">
            Request a Private Consultation
          </h1>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Initiate a confidential acquisition, schedule an exclusive salon viewing, or discuss bespoke commission requirements with our lead curators.
          </p>
        </div>

        {/* Two-Column Form & Salons Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Consultation Form Column */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

          {/* Salons & Contact Directory Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FFFFFF] p-8 border border-[#E5E2DB] space-y-6">
              <h3 className="font-serif text-xl text-[#111111]">
                Global Atelier Salons
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                We welcome prospective patrons and collectors to our private viewing salons by advance appointment.
              </p>

              <div className="space-y-6 divide-y divide-[#E5E2DB] pt-2">
                {salons.map((salon, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-6 space-y-2 text-xs' : 'space-y-2 text-xs'}>
                    <div className="font-serif text-sm font-semibold text-[#111111]">
                      {salon.city}
                    </div>
                    <div className="flex items-start gap-2 text-[#555555]">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#555555]">
                      <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{salon.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#555555]">
                      <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <a href={`mailto:${salon.email}`} className="hover:underline text-[#111111]">
                        {salon.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#737373] text-[11px]">
                      <Clock className="w-3 h-3 text-[#888888] shrink-0" />
                      <span>{salon.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="p-6 bg-[#FAF9F6] border border-[#E5E2DB] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#111111] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Confidentiality Protocol</span>
              </div>
              <p className="text-[#666666] leading-relaxed text-[11px]">
                All client communications are strictly confidential. Our maison does not share, monetize, or disclose patron identities under any circumstance.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
