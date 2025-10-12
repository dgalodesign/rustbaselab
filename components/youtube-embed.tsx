"use client"

interface YouTubeEmbedProps {
  url: string
  title: string
}

export function YouTubeEmbed({ url, title }: YouTubeEmbedProps) {
  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getVideoId(url)

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
