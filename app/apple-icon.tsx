export const runtime = "edge"
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default async function AppleIcon() {
  const imageData = await fetch(
    new URL("/favicon.png", process.env.NEXT_PUBLIC_SITE_URL || "https://rustbaselab.com"),
  ).then((res) => res.arrayBuffer())

  return new Response(imageData, {
    headers: {
      "Content-Type": "image/png",
    },
  })
}
