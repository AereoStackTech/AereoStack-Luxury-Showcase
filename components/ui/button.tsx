import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] disabled:pointer-events-none disabled:opacity-40 select-none tracking-wider uppercase',
  {
    variants: {
      variant: {
        default:
          'bg-[#111111] text-[#FAFAFA] hover:bg-[#262626] active:bg-[#000000] border border-[#111111]',
        gold:
          'bg-[#C5A880] text-[#111111] font-semibold hover:bg-[#B3956D] active:bg-[#9E8057] border border-[#C5A880]',
        outline:
          'border border-[#111111] text-[#111111] bg-transparent hover:bg-[#111111] hover:text-[#FAFAFA]',
        outlineGold:
          'border border-[#C5A880] text-[#111111] bg-transparent hover:bg-[#C5A880] hover:text-[#111111]',
        ghost:
          'text-[#111111] hover:bg-[#EFECE6] active:bg-[#E4E0D7]',
        ghostDark:
          'text-[#FAFAFA] hover:bg-[#262626] active:bg-[#333333]',
        link:
          'text-[#111111] underline-offset-4 hover:underline p-0 h-auto normal-case tracking-normal font-normal',
      },
      size: {
        default: 'h-11 px-6 py-2 text-xs',
        sm: 'h-9 px-4 text-[11px]',
        lg: 'h-13 px-8 text-xs',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, id, ...props }, ref) => {
    return (
      <button
        id={id}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
