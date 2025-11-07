import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5E9]/20",
  {
    variants: {
      variant: {
        default: "bg-[#0EA5E9] text-white hover:bg-[#0284C7] shadow-lg shadow-[#0EA5E9]/30 hover:shadow-xl hover:shadow-[#0EA5E9]/40",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
        outline:
          "border-2 border-[#0EA5E9] text-[#0EA5E9] bg-transparent hover:bg-[#0EA5E9]/5",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost:
          "hover:bg-gray-100 text-gray-700",
        link: "text-[#0EA5E9] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3 has-[>svg]:px-6",
        sm: "h-10 px-6 py-2.5 has-[>svg]:px-4 text-sm",
        lg: "h-14 px-10 py-4 has-[>svg]:px-8 text-base",
        icon: "size-12",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
