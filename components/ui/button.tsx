import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary'
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-accent text-accent-foreground hover:opacity-90',
        variant === 'secondary' &&
          'border border-border bg-transparent text-foreground hover:bg-border/40',
        className
      )}
      {...props}
    />
  )
}
