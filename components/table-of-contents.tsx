import type { NotionBlock } from "@/lib/notion-blog"
import { slugifyHeading } from "@/components/notion-block-renderer"
import { List } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: 1 | 2 | 3
}

function extractHeadings(blocks: NotionBlock[]): TocItem[] {
  const headings: TocItem[] = []

  for (const block of blocks) {
    const level =
      block.type === "heading_1" ? 1 :
      block.type === "heading_2" ? 2 :
      block.type === "heading_3" ? 3 : null

    if (!level) continue

    const key = `heading_${level}` as "heading_1" | "heading_2" | "heading_3"
    const text = block[key]?.rich_text?.map((r) => r.plain_text ?? "").join("") ?? ""
    if (!text) continue

    headings.push({ id: slugifyHeading(text), text, level })
  }

  return headings
}

interface TableOfContentsProps {
  blocks: NotionBlock[]
}

export function TableOfContents({ blocks }: TableOfContentsProps) {
  const headings = extractHeadings(blocks)

  if (headings.length < 3) return null

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-lg border border-border bg-card p-5 mb-8"
    >
      <p className="flex items-center gap-2 font-display font-bold text-sm text-foreground mb-3">
        <List className="h-4 w-4" />
        In this article
      </p>
      <ol className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
