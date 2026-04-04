"use client"

import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { toast } from "sonner"

interface RequestInfoButtonProps {
  requestType: "build_cost" | "upkeep" | "raid_cost"
  action: (formData: FormData) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function RequestInfoButton({ requestType, action }: RequestInfoButtonProps) {
  const label = requestType === "build_cost" ? "Build Cost" : requestType === "upkeep" ? "Upkeep Data" : "Raid Cost"

  const handleClick = () => {
    toast.success(`Got it! We'll add the ${label} shortly.`)

    // Ejecutar la acción en segundo plano sin bloquear la UI
    const formData = new FormData()
    formData.append("requestType", requestType)

    action(formData).catch((error) => {
      console.error("[v0] Background request failed:", error)
      // No mostrar error al usuario ya que el feedback fue positivo
    })
  }

  return (
    <Button type="button" variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleClick}>
      <Info className="h-4 w-4" />
      Request {label}
    </Button>
  )
}
