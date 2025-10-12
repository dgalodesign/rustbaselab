"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Eye } from "lucide-react"
import type { Base } from "@/lib/types"
import Link from "next/link"

interface BaseListProps {
  bases: Base[]
  onEdit: (base: Base) => void
  onDelete: (id: string) => void
}

export function BaseList({ bases, onEdit, onDelete }: BaseListProps) {
  return (
    <div className="space-y-4">
      {bases.map((base) => (
        <Card key={base.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold">{base.title}</h3>
                  {base.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                </div>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{base.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{base.category}</Badge>
                  <Badge variant="outline">{base.difficulty}</Badge>
                  <span className="text-xs text-muted-foreground">{base.views.toLocaleString()} views</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/base/${base.id}`} target="_blank">
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEdit(base)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this base?")) {
                      onDelete(base.id)
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
