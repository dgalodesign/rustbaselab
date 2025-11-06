import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToHome } from "@/components/back-to-home"

export const metadata: Metadata = {
  title: "Feedback | RustBaseLab",
  description: "Share your feedback and suggestions to help us improve RustBaseLab.",
}

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <BackToHome />
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold font-display">Feedback</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            We'd love to hear your thoughts, suggestions, and ideas to make RustBaseLab better.
          </p>

          <div className="overflow-hidden border-2 border-border bg-card shadow-lg rounded-xl">
            <iframe
              src="https://dgalodesign.notion.site/ebd/299dd320ec4a806da553cc188d88cafc"
              width="100%"
              height="960"
              className="border-0"
              title="Feedback Form"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
