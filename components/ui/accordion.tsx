'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionItemContextType {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | undefined>(undefined);

export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-[#E5E2DB] border-y border-[#E5E2DB]', className)}>{children}</div>;
}

export function AccordionItem({
  children,
  className,
  defaultOpen = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  id?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <AccordionItemContext.Provider value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}>
      <div id={id} className={cn('py-2', className)}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionTrigger must be used within AccordionItem');

  return (
    <button
      id={id}
      type="button"
      onClick={context.toggle}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-serif text-lg sm:text-xl text-[#111111] transition-all hover:text-[#C5A880]',
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'h-5 w-5 shrink-0 text-[#737373] transition-transform duration-300',
          context.isOpen && 'rotate-180 text-[#C5A880]'
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionItemContext);
  if (!context) throw new Error('AccordionContent must be used within AccordionItem');

  return (
    <AnimatePresence initial={false}>
      {context.isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('pb-6 pt-1 text-sm sm:text-base text-[#555555] leading-relaxed max-w-3xl', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
