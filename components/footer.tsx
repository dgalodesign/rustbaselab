import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-mono text-lg font-bold">RustBaseLab</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate resource for Rust base designs and building tutorials.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/bases" className="text-muted-foreground transition-colors hover:text-primary">
                  All Bases
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground transition-colors hover:text-primary">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/bases?category=solo"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Solo Bases
                </Link>
              </li>
              <li>
                <Link href="/bases?category=duo" className="text-muted-foreground transition-colors hover:text-primary">
                  Duo Bases
                </Link>
              </li>
              <li>
                <Link
                  href="/bases?category=trio"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Trio Bases
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RustBaseLab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
