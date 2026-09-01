'use client';

import * as React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import type { LuxuryFAQ } from '@/lib/db';

export function FAQAccordion({ faqs }: { faqs: LuxuryFAQ[] }) {
  return (
    <Accordion className="w-full">
      {faqs.map((faq, idx) => (
        <AccordionItem
          key={faq.id}
          id={`faq-item-${faq.id}`}
          defaultOpen={idx === 0}
        >
          <AccordionTrigger id={`faq-trigger-${faq.id}`}>
            {faq.question}
          </AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
