import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "@/lib/cva"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap text-sm font-semibold uppercase tracking-widest transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-2)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] active:scale-95",
        destructive:
          "bg-[var(--color-accent)] text-black hover:bg-[var(--color-accent-2)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,69,0,0.5)] active:scale-95",
        outline:
          "border border-white/20 text-white hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(255,69,0,0.2)] active:scale-95 before:absolute before:inset-0 before:bg-[var(--color-accent)] before:scale-x-0 before:origin-left before:opacity-10 before:transition-transform before:duration-500 hover:before:scale-x-100",
        secondary:
          "border border-white/20 text-white hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(255,69,0,0.2)] active:scale-95 before:absolute before:inset-0 before:bg-[var(--color-accent)] before:scale-x-0 before:origin-left before:opacity-10 before:transition-transform before:duration-500 hover:before:scale-x-100",
        ghost: "text-white hover:bg-white/10 hover:text-white active:scale-95",
        link: "px-0 py-0 text-[var(--color-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-8 py-4 text-sm",
        sm: "px-6 py-3 text-xs",
        lg: "px-10 py-5 text-sm",
        icon: "size-10 rounded-full p-0 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return <Comp ref={ref} data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
