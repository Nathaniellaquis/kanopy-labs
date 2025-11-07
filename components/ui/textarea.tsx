import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-32 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none transition-all resize-none",
        "placeholder:text-gray-400",
        "focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
