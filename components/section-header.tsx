import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ icon: Icon, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-center justify-between", className)}>
      <div>
        <div className="flex mb-2 items-center gap-4">
          <h2 className="font-bold font-display text-4xl">{title}</h2>
          {Icon && <Icon className="text-primary size-8" />}
        </div>
        {description && <p className="text-muted-foreground text-base">{description}</p>}
      </div>
    </div>
  )
}
