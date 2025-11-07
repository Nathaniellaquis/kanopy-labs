import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none transition-all",
        "placeholder:text-gray-400",
        "focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        "file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
}

export { Input }
