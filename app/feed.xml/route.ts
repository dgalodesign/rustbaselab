import { getAllBlogPosts } from "@/lib/notion-blog"

export const revalidate = 3600

const BASE_URL = "https://rustbaselab.com"

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getAllBlogPosts()

  const items = posts
    .filter((post) => post.slug && post.publishedDate)
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`
      const pubDate = new Date(post.publishedDate!).toUTCString()
      const description = post.description ? escapeXml(post.description) : ""
      const title = escapeXml(post.title)
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("\n        ")

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      ${categories}
      ${post.coverImageUrl ? `<enclosure url="${escapeXml(post.coverImageUrl)}" type="image/jpeg" length="0" />` : ""}
    </item>`
    })
    .join("")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>RustBaseLab Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Rust base building guides, tutorials, and strategies for every team size.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/og-image.png</url>
      <title>RustBaseLab Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
