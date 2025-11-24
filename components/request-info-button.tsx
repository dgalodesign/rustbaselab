"use client"

import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { toast } from "sonner"

interface RequestInfoButtonProps {
  requestType: "build_cost" | "upkeep"
  action: (formData: FormData) => Promise<{ success: boolean; message?: string; error?: string }>
}

export function RequestInfoButton({ requestType, action }: RequestInfoButtonProps) {
  const handleClick = () => {
    // Mostrar toast de éxito inmediatamente
    toast.success("Request sent! We'll update the information soon.")

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
      Request Information
    </Button>
  )
}
