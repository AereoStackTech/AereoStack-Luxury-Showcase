import * as React from 'react';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn('w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12', className)}
    >
      {children}
    </div>
  );
}
