import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackToHome() {
  return (
    <Button variant="ghost" size="sm" asChild className="hover:bg-muted font-mono">
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        BACK TO HOME
      </Link>
    </Button>
  )
}
