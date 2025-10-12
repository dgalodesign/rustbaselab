"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BaseForm } from "@/components/admin/base-form"
import { BaseList } from "@/components/admin/base-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBases } from "@/lib/mock-data"
import { Plus, Database, Eye, TrendingUp } from "lucide-react"
import type { Base } from "@/lib/types"

export default function AdminPage() {
  const [bases, setBases] = useState<Base[]>(mockBases)
  const [editingBase, setEditingBase] = useState<Base | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (data: Partial<Base>) => {
    if (editingBase) {
      // Update existing base
      setBases(
        bases.map((base) =>
          base.id === editingBase.id ? { ...base, ...data, updatedAt: new Date().toISOString() } : base,
        ),
      )
      alert("Base updated successfully!")
    } else {
      // Create new base
      const newBase: Base = {
        id: String(bases.length + 1),
        title: data.title!,
        description: data.description!,
        youtubeUrl: data.youtubeUrl!,
        thumbnailUrl: data.thumbnailUrl || "/placeholder.svg?height=400&width=600",
        category: data.category!,
        difficulty: data.difficulty!,
        buildTime: data.buildTime!,
        materials: data.materials!,
        featured: data.featured || false,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setBases([...bases, newBase])
      alert("Base created successfully!")
    }
    setShowForm(false)
    setEditingBase(null)
  }

  const handleEdit = (base: Base) => {
    setEditingBase(base)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setBases(bases.filter((base) => base.id !== id))
    alert("Base deleted successfully!")
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingBase(null)
  }

  const totalViews = bases.reduce((sum, base) => sum + base.views, 0)
  const featuredCount = bases.filter((base) => base.featured).length

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 font-mono text-4xl font-bold">Admin Panel</h1>
            <p className="text-lg text-muted-foreground">Manage your Rust base catalog</p>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bases</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bases.length}</div>
                <p className="text-xs text-muted-foreground">Active base designs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all bases</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Bases</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{featuredCount}</div>
                <p className="text-xs text-muted-foreground">Shown on homepage</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Manage Bases</h2>
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Base
              </Button>
            )}
          </div>

          {showForm ? (
            <BaseForm base={editingBase || undefined} onSubmit={handleSubmit} onCancel={handleCancel} />
          ) : (
            <BaseList bases={bases} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
