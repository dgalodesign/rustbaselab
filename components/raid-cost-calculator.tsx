"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, Trash2, Zap } from "lucide-react"

// ─── Game data ────────────────────────────────────────────────────────────────

const MATERIALS = ["Twig", "Wood", "Stone", "Metal", "HQM", "Armored"] as const
type Material = typeof MATERIALS[number]

// HP per building piece by material
const HP: Record<Material, { wall: number; floor: number; door: number; window: number }> = {
  Twig:    { wall: 10,   floor: 10,   door: 10,   window: 10 },
  Wood:    { wall: 250,  floor: 250,  door: 200,  window: 250 },
  Stone:   { wall: 500,  floor: 500,  door: 250,  window: 500 },
  Metal:   { wall: 1000, floor: 1000, door: 250,  window: 1000 },
  HQM:     { wall: 2000, floor: 2000, door: 500,  window: 2000 },
  Armored: { wall: 2000, floor: 2000, door: 800,  window: 2000 },
}

const PIECE_TYPES = [
  { key: "wall",   label: "Walls" },
  { key: "floor",  label: "Floors / Ceilings" },
  { key: "door",   label: "Doors" },
  { key: "window", label: "Windows / Wall Frames" },
] as const
type PieceType = typeof PIECE_TYPES[number]["key"]

// Damage per hit
const WEAPONS = {
  rocket:  { label: "Rocket",          damage: { wall: 350, floor: 350, door: 350, window: 350 }, sulfurPerUnit: 1400 },
  c4:      { label: "C4",              damage: { wall: 550, floor: 550, door: 550, window: 550 }, sulfurPerUnit: 2200 },
  satchel: { label: "Satchel Charge",  damage: { wall: 475, floor: 475, door: 475, window: 475 }, sulfurPerUnit: 480 },
} as const
type Weapon = keyof typeof WEAPONS

// ─── Types ────────────────────────────────────────────────────────────────────

interface Row {
  id: number
  material: Material
  pieceType: PieceType
  count: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hitsNeeded(hp: number, dmg: number) {
  return Math.ceil(hp / dmg)
}

// ─── Component ────────────────────────────────────────────────────────────────

let nextId = 1

const DEFAULT_ROWS: Row[] = [
  { id: nextId++, material: "Stone", pieceType: "wall",  count: 8 },
  { id: nextId++, material: "Stone", pieceType: "floor", count: 4 },
  { id: nextId++, material: "Metal", pieceType: "door",  count: 2 },
]

export function RaidCostCalculator() {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS)
  const [weapon, setWeapon] = useState<Weapon>("rocket")

  const addRow = () => {
    setRows((prev) => [...prev, { id: nextId++, material: "Stone", pieceType: "wall", count: 1 }])
  }

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  const updateRow = (id: number, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  }

  const results = useMemo(() => {
    const w = WEAPONS[weapon]
    let totalHits = 0
    let totalSulfur = 0

    const breakdown = rows.map((row) => {
      const hp = HP[row.material][row.pieceType]
      const hits = hitsNeeded(hp, w.damage[row.pieceType]) * row.count
      const sulfur = hits * w.sulfurPerUnit
      totalHits += hits
      totalSulfur += sulfur
      return { ...row, hp, hits }
    })

    totalSulfur = totalHits * w.sulfurPerUnit

    return { breakdown, totalHits, totalSulfur }
  }, [rows, weapon])

  const weaponInfo = WEAPONS[weapon]

  return (
    <div className="space-y-6">
      {/* Weapon selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(WEAPONS) as Weapon[]).map((w) => (
          <button
            key={w}
            onClick={() => setWeapon(w)}
            className={`rounded border px-3 py-1.5 text-sm font-bold uppercase transition-colors ${
              weapon === w
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {WEAPONS[w].label}
          </button>
        ))}
      </div>

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
        <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
          <Zap className="h-5 w-5" />
          Raid Cost
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-3xl font-display font-bold text-foreground">{results.totalHits}</p>
            <p className="text-sm text-muted-foreground mt-1">{weaponInfo.label}s needed</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary">
              {results.totalSulfur.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Sulfur total</p>
          </div>
        </div>

        {/* Breakdown */}
        {results.breakdown.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Breakdown</p>
            {results.breakdown.map((row) => (
              <div key={row.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {row.count}× {row.material} {PIECE_TYPES.find(p => p.key === row.pieceType)?.label.replace("s", "")}
                  <span className="text-xs ml-1">({row.hp} HP each)</span>
                </span>
                <span className="font-bold text-foreground">{row.hits} {weaponInfo.label.toLowerCase()}s</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground border-t border-border pt-3">
          Based on vanilla Rust damage values. Soft-side multiplier not included.
          {weapon === "satchel" && " Satchel charges have random dud chance — add ~10% buffer."}
        </p>
      </div>
    </div>
  )
}
