'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SheetContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetContent({
  children,
  side = 'right',
  className,
  id,
}: {
  children: React.ReactNode;
  side?: 'right' | 'left';
  className?: string;
  id?: string;
}) {
  const context = React.useContext(SheetContext);
  if (!context) throw new Error('SheetContent must be used within Sheet');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') context.setOpen(false);
    };
    if (context.open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [context]);

  const initialX = side === 'right' ? '100%' : '-100%';

  return (
    <AnimatePresence>
      {context.open && (
        <div className="fixed inset-0 z-50 flex" id={id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => context.setOpen(false)}
            className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-50 h-full w-full max-w-md bg-[#FAF9F6] p-8 shadow-2xl flex flex-col justify-between border-l border-[#E5E2DB]',
              side === 'left' && 'mr-auto border-r border-l-0',
              side === 'right' && 'ml-auto',
              className
            )}
          >
            <button
              onClick={() => context.setOpen(false)}
              className="absolute right-6 top-6 p-2 text-[#737373] hover:text-[#111111] transition-colors focus:outline-none"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 overflow-y-auto pt-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SheetHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col space-y-2 text-left mb-6', className)}>{children}</div>;
}

export function SheetTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn('text-2xl font-serif text-[#111111]', className)}>{children}</h2>;
}
