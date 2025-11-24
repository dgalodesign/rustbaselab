"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useFavorites } from "@/hooks/use-favorites"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="mb-8 font-display text-4xl font-bold text-foreground">MY FAVORITES</h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 rounded-full bg-muted p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">No favorites yet</h2>
            <p className="mb-8 text-muted-foreground max-w-md">
              You haven't saved any bases yet. Explore our collection to find the perfect design for your next wipe.
            </p>
            <Button asChild size="lg">
              <Link href="/bases">Explore Bases</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((base) => (
              <Link key={base.id} href={`/base/${base.slug}`}>
                <Card className="h-full overflow-hidden border-2 border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg group">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {base.image_main_url ? (
                      <Image
                        src={base.image_main_url || "/placeholder.svg"}
                        alt={base.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(base.title)}`
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">No Preview</div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 line-clamp-1 font-display text-lg font-bold text-foreground">{base.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {base.type && (
                        <Badge variant="outline" className="font-mono text-xs">
                          {base.type}
                        </Badge>
                      )}
                      {base.team_size?.map((size) => (
                        <Badge key={size} variant="secondary" className="font-mono text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
