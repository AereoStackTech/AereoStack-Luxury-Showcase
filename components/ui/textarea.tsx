import * as React from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, ...props }, ref) => {
    return (
      <textarea
        id={id}
        className={cn(
          'flex min-h-[110px] w-full bg-[#FFFFFF] px-4 py-3 text-sm text-[#111111] placeholder:text-[#888888] border border-[#E5E2DB] transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#111111] focus-visible:ring-1 focus-visible:ring-[#111111] disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
