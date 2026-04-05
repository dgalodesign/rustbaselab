"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, Trash2, Home } from "lucide-react"

// ─── Game data ────────────────────────────────────────────────────────────────
// Upkeep cost per building piece per hour (in resources)
// Source: Rust wiki — Twig decays, others require upkeep from TC

const MATERIALS = ["Wood", "Stone", "Metal", "HQM"] as const
type Material = typeof MATERIALS[number]

// Upkeep per piece per day (24h cycle in TC)
// Rust upkeep formula: base cost × piece count, capped per resource type
const UPKEEP_PER_PIECE: Record<Material, { wood: number; stone: number; metal: number; hqm: number }> = {
  Wood:  { wood: 1,   stone: 0, metal: 0,    hqm: 0 },
  Stone: { wood: 0,   stone: 2, metal: 0,    hqm: 0 },
  Metal: { wood: 0,   stone: 0, metal: 0.08, hqm: 0 },
  HQM:   { wood: 0,   stone: 0, metal: 0,    hqm: 0.01 },
}

// Stability cost multiplier by piece type (some pieces cost more upkeep)
const PIECE_MULTIPLIER: Record<string, number> = {
  foundation:  1,
  wall:        1,
  floor:       1,
  doorframe:   1,
  windowframe: 1,
  stairs:      1,
  roof:        1,
  triangle:    0.5,  // triangle foundations/floors cost half
}

const PIECE_TYPES = [
  { key: "foundation",  label: "Foundation / Floor Frame" },
  { key: "wall",        label: "Wall / Wall Frame" },
  { key: "floor",       label: "Floor / Ceiling" },
  { key: "triangle",    label: "Triangle Foundation / Floor" },
  { key: "stairs",      label: "Stairs / Ramp" },
  { key: "roof",        label: "Roof" },
  { key: "doorframe",   label: "Door Frame" },
  { key: "windowframe", label: "Window Frame" },
] as const

type PieceType = typeof PIECE_TYPES[number]["key"]

interface Row {
  id: number
  material: Material
  pieceType: PieceType
  count: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcUpkeep(rows: Row[]) {
  let wood = 0, stone = 0, metal = 0, hqm = 0

  for (const row of rows) {
    const base = UPKEEP_PER_PIECE[row.material]
    const mult = PIECE_MULTIPLIER[row.pieceType] ?? 1
    const n = row.count

    wood  += base.wood  * mult * n
    stone += base.stone * mult * n
    metal += base.metal * mult * n
    hqm   += base.hqm   * mult * n
  }

  // Round up — Rust always rounds up upkeep
  return {
    wood:  Math.ceil(wood),
    stone: Math.ceil(stone),
    metal: Math.ceil(metal),
    hqm:   Math.ceil(hqm),
  }
}

// ─── Upkeep display row ───────────────────────────────────────────────────────

function ResourceRow({ label, perDay, color }: { label: string; perDay: number; color: string }) {
  if (perDay === 0) return null
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className={`text-sm font-bold ${color}`}>{label}</span>
      <div className="text-right">
        <span className="font-display font-bold text-foreground text-lg">{perDay.toLocaleString()}</span>
        <span className="text-xs text-muted-foreground ml-1">/ day</span>
        <p className="text-xs text-muted-foreground">{Math.ceil(perDay / 24)} / hr</p>
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

let nextId = 1

const DEFAULT_ROWS: Row[] = [
  { id: nextId++, material: "Stone", pieceType: "foundation", count: 4 },
  { id: nextId++, material: "Stone", pieceType: "wall",       count: 16 },
  { id: nextId++, material: "Stone", pieceType: "floor",      count: 4 },
  { id: nextId++, material: "Metal", pieceType: "doorframe",  count: 2 },
]

export function UpkeepCalculator() {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS)

  const addRow = () => {
    setRows((prev) => [...prev, { id: nextId++, material: "Stone", pieceType: "wall", count: 1 }])
  }

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const updateRow = (id: number, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const upkeep = useMemo(() => calcUpkeep(rows), [rows])

  const totalPieces = rows.reduce((acc, r) => acc + r.count, 0)
  const hasUpkeep = upkeep.wood > 0 || upkeep.stone > 0 || upkeep.metal > 0 || upkeep.hqm > 0

  // TC capacity: 25% + 1 day of resources per building tier
  // Basic guideline: keep enough for 24h
  const tcRecommendation = {
    wood:  upkeep.wood,
    stone: upkeep.stone,
    metal: upkeep.metal,
    hqm:   upkeep.hqm,
  }

  return (
    <div className="space-y-6">

      {/* Rows */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-center rounded-lg border border-border bg-card p-3"
          >
            {/* Material */}
            <select
              value={row.material}
              onChange={(e) => updateRow(row.id, { material: e.target.value as Material })}
              className="rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {MATERIALS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Piece type */}
            <select
              value={row.pieceType}
              onChange={(e) => updateRow(row.id, { pieceType: e.target.value as PieceType })}
              className="rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {PIECE_TYPES.map((pt) => (
                <option key={pt.key} value={pt.key}>{pt.label}</option>
              ))}
            </select>

            {/* Count */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateRow(row.id, { count: Math.max(1, row.count - 1) })}
                className="rounded border border-border bg-background p-1 hover:border-primary hover:text-primary transition-colors"
              >
                <Minus className="h-3 w-3" />
              </button>
              <Input
                type="number"
                min={1}
                max={999}
                value={row.count}
                onChange={(e) => updateRow(row.id, { count: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-14 text-center px-1"
              />
              <button
                onClick={() => updateRow(row.id, { count: row.count + 1 })}
                className="rounded border border-border bg-background p-1 hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeRow(row.id)}
              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        <Button variant="outline" onClick={addRow} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add piece
        </Button>
      </div>

      {/* Results */}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
            <Home className="h-5 w-5" />
            Upkeep Cost
          </div>
          <span className="text-sm text-muted-foreground">{totalPieces} pieces total</span>
        </div>

        {hasUpkeep ? (
          <div className="rounded-lg border border-border bg-card p-4">
            <ResourceRow label="Wood"         perDay={upkeep.wood}  color="text-orange-400" />
            <ResourceRow label="Stone"        perDay={upkeep.stone} color="text-slate-300" />
            <ResourceRow label="Metal Frags"  perDay={upkeep.metal} color="text-blue-400" />
            <ResourceRow label="HQM"          perDay={upkeep.hqm}   color="text-primary" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Add building pieces to calculate upkeep.</p>
        )}

        {/* TC stock recommendation */}
        {hasUpkeep && (
          <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <p className="text-xs font-bold uppercase text-muted-foreground">Minimum TC stock (24h)</p>
            <div className="flex flex-wrap gap-3">
              {tcRecommendation.wood  > 0 && <span className="text-sm text-orange-400 font-bold">{tcRecommendation.wood.toLocaleString()} Wood</span>}
              {tcRecommendation.stone > 0 && <span className="text-sm text-slate-300 font-bold">{tcRecommendation.stone.toLocaleString()} Stone</span>}
              {tcRecommendation.metal > 0 && <span className="text-sm text-blue-400 font-bold">{tcRecommendation.metal.toLocaleString()} Metal Frags</span>}
              {tcRecommendation.hqm   > 0 && <span className="text-sm text-primary font-bold">{tcRecommendation.hqm.toLocaleString()} HQM</span>}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground border-t border-border pt-3">
          Based on vanilla Rust upkeep rates. Decay begins after TC is empty. Twig structures are not included — they always decay.
        </p>
      </div>
    </div>
  )
}
