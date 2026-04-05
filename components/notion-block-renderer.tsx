import type { NotionBlock, RichTextItem } from "@/lib/notion-blog"
import Image from "next/image"
import { cn } from "@/lib/utils"

// ─── Rich Text Renderer ───────────────────────────────────────────────────────

function RichText({ items }: { items: RichTextItem[] | undefined }) {
  if (!items || items.length === 0) return null

  return (
    <>
      {items.map((item, i) => {
        const text = item.plain_text ?? ""
        const ann = item.annotations
        const href = item.href ?? item.text?.link?.url

        let content: React.ReactNode = text

        if (ann?.bold) content = <strong key={`b-${i}`}>{content}</strong>
        if (ann?.italic) content = <em key={`i-${i}`}>{content}</em>
        if (ann?.strikethrough) content = <s key={`s-${i}`}>{content}</s>
        if (ann?.code) {
          content = (
            <code
              key={`c-${i}`}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-accent"
            >
              {content}
            </code>
          )
        }

        if (href) {
          return (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              {content}
            </a>
          )
        }

        return <span key={i}>{content}</span>
      })}
    </>
  )
}

// ─── Block Types ──────────────────────────────────────────────────────────────

function ParagraphBlock({ block }: { block: NotionBlock }) {
  const items = block.paragraph?.rich_text
  if (!items || items.length === 0) return <div className="h-4" />
  return (
    <p className="text-foreground/90 leading-relaxed">
      <RichText items={items} />
    </p>
  )
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function HeadingBlock({ block, level }: { block: NotionBlock; level: 1 | 2 | 3 }) {
  const key = `heading_${level}` as "heading_1" | "heading_2" | "heading_3"
  const items = block[key]?.rich_text
  const plainText = items?.map((r) => r.plain_text ?? "").join("") ?? ""
  const id = slugifyHeading(plainText)

  const Tag = level === 1 ? "h2" : level === 2 ? "h3" : "h4"
  const className = cn(
    "font-display font-bold text-foreground scroll-mt-20",
    level === 1 && "text-2xl md:text-3xl mt-10 mb-4",
    level === 2 && "text-xl md:text-2xl mt-8 mb-3",
    level === 3 && "text-lg md:text-xl mt-6 mb-2"
  )

  return (
    <Tag id={id} className={className}>
      <RichText items={items} />
    </Tag>
  )
}

function BulletedListBlock({ blocks }: { blocks: NotionBlock[] }) {
  return (
    <ul className="list-disc list-outside ml-6 space-y-1.5 text-foreground/90">
      {blocks.map((block) => (
        <li key={block.id}>
          <RichText items={block.bulleted_list_item?.rich_text} />
        </li>
      ))}
    </ul>
  )
}

function NumberedListBlock({ blocks }: { blocks: NotionBlock[] }) {
  return (
    <ol className="list-decimal list-outside ml-6 space-y-1.5 text-foreground/90">
      {blocks.map((block) => (
        <li key={block.id}>
          <RichText items={block.numbered_list_item?.rich_text} />
        </li>
      ))}
    </ol>
  )
}

function QuoteBlock({ block }: { block: NotionBlock }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/70 my-4">
      <RichText items={block.quote?.rich_text} />
    </blockquote>
  )
}

function CalloutBlock({ block }: { block: NotionBlock }) {
  const emoji = block.callout?.icon?.type === "emoji" ? block.callout.icon.emoji : "💡"
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <span className="text-xl shrink-0" aria-hidden="true">
        {emoji}
      </span>
      <p className="text-foreground/90 leading-relaxed">
        <RichText items={block.callout?.rich_text} />
      </p>
    </div>
  )
}

function CodeBlock({ block }: { block: NotionBlock }) {
  const code = block.code?.rich_text.map((r) => r.plain_text ?? "").join("") ?? ""
  const lang = block.code?.language ?? ""
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {lang && (
        <div className="bg-muted px-4 py-1.5 text-xs font-mono text-muted-foreground border-b border-border">
          {lang}
        </div>
      )}
      <pre className="overflow-x-auto p-4 bg-card">
        <code className="font-mono text-sm text-foreground/90">{code}</code>
      </pre>
    </div>
  )
}

function ImageBlock({ block }: { block: NotionBlock }) {
  const img = block.image
  if (!img) return null

  const url = img.type === "external" ? img.external?.url : img.file?.url
  if (!url) return null

  const caption = img.caption?.map((r) => r.plain_text ?? "").join("") ?? ""

  return (
    <figure className="my-6">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
        <Image
          src={url}
          alt={caption || "Blog image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  )
}

function DividerBlock() {
  return <hr className="border-t border-border my-8" />
}

// ─── Main Renderer ────────────────────────────────────────────────────────────

interface NotionBlockRendererProps {
  blocks: NotionBlock[]
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    // Group consecutive bulleted list items
    if (block.type === "bulleted_list_item") {
      const group: NotionBlock[] = []
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        group.push(blocks[i])
        i++
      }
      elements.push(<BulletedListBlock key={`bullet-${group[0].id}`} blocks={group} />)
      continue
    }

    // Group consecutive numbered list items
    if (block.type === "numbered_list_item") {
      const group: NotionBlock[] = []
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        group.push(blocks[i])
        i++
      }
      elements.push(<NumberedListBlock key={`numbered-${group[0].id}`} blocks={group} />)
      continue
    }

    switch (block.type) {
      case "paragraph":
        elements.push(<ParagraphBlock key={block.id} block={block} />)
        break
      case "heading_1":
        elements.push(<HeadingBlock key={block.id} block={block} level={1} />)
        break
      case "heading_2":
        elements.push(<HeadingBlock key={block.id} block={block} level={2} />)
        break
      case "heading_3":
        elements.push(<HeadingBlock key={block.id} block={block} level={3} />)
        break
      case "quote":
        elements.push(<QuoteBlock key={block.id} block={block} />)
        break
      case "callout":
        elements.push(<CalloutBlock key={block.id} block={block} />)
        break
      case "code":
        elements.push(<CodeBlock key={block.id} block={block} />)
        break
      case "image":
        elements.push(<ImageBlock key={block.id} block={block} />)
        break
      case "divider":
        elements.push(<DividerBlock key={block.id} />)
        break
      default:
        // Unsupported block type — skip silently
        break
    }

    i++
  }

  return (
    <div className="space-y-5 prose-custom">
      {elements}
    </div>
  )
}
