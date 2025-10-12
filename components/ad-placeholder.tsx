interface AdPlaceholderProps {
  slot: string
  format?: "horizontal" | "vertical" | "square"
  className?: string
}

export function AdPlaceholder({ slot, format = "horizontal", className = "" }: AdPlaceholderProps) {
  const dimensions = {
    horizontal: "h-24 md:h-32",
    vertical: "h-96",
    square: "h-64",
  }

  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-border/40 bg-muted/20 ${dimensions[format]} ${className}`}
    >
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">Ad Space</p>
        <p className="text-xs text-muted-foreground/60">{slot}</p>
      </div>
    </div>
  )
}
