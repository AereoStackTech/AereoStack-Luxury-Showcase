import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, ...props }, ref) => {
    return (
      <input
        type={type}
        id={id}
        className={cn(
          'flex h-11 w-full bg-[#FFFFFF] px-4 py-2 text-sm text-[#111111] placeholder:text-[#888888] border border-[#E5E2DB] transition-colors duration-200 focus-visible:outline-none focus-visible:border-[#111111] focus-visible:ring-1 focus-visible:ring-[#111111] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
