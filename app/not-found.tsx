import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center bg-[#FAF9F6] text-[#111111]">
      <div className="max-w-md space-y-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
          404 &mdash; Archive Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-[#111111]">
          Masterpiece Unavailable
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
          The requested creation, curation, or salon page may have been relocated to the private vaults or is no longer accessible.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#FAFAFA] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#262626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
