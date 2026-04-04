"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  url?: string
  videoId?: string
  title: string
  baseId?: string
}

export function YouTubeEmbed({ url, videoId: propVideoId, title, baseId }: YouTubeEmbedProps) {
  const [hasClicked, setHasClicked] = useState(false)

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    if (!url) return null
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = propVideoId || (url ? getVideoId(url) : null)

  if (!videoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">Invalid YouTube URL</p>
      </div>
    )
  }

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  const handlePlay = () => {
    setHasClicked(true)

    // Increment counter only when the user actually clicks to play
    if (baseId) {
      fetch("/api/increment-youtube-clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseId }),
      }).catch(() => {
        // Non-critical: silently ignore tracking errors
      })
    }
  }

  if (!hasClicked) {
    return (
      <div
        className="relative aspect-video overflow-hidden rounded-lg bg-black cursor-pointer group"
        onClick={handlePlay}
        role="button"
        aria-label={`Play video: ${title}`}
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors shadow-xl">
            <Play className="h-7 w-7 text-white fill-white ml-1" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  )
}
