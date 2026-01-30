import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-glow/70 disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-glow text-ink shadow-glow',
        secondary: 'bg-white/10 text-white border border-white/15',
        ghost: 'bg-transparent text-white/80 hover:text-white'
      }
    },
    defaultVariants: {
      variant: 'secondary'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={clsx(buttonVariants({ variant }), className)} {...props} />
  );
}
