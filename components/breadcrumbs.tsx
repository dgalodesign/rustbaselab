import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-muted-foreground", className)}>
            <ol className="flex items-center gap-1.5 flex-wrap">
                <li className="flex items-center gap-1.5">
                    <Link
                        href="/"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                        aria-label="Home"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <li key={index} className="flex items-center gap-1.5">
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={cn("font-medium text-foreground", isLast && "truncate max-w-[200px] sm:max-w-none")}>
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                            )}
                        </li>
                    )
                })}
            </ol>

            {/* JSON-LD Schema for Breadcrumbs */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            {
                                "@type": "ListItem",
                                position: 1,
                                name: "Home",
                                item: "https://rustbaselab.com",
                            },
                            ...items.map((item, index) => ({
                                "@type": "ListItem",
                                position: index + 2,
                                name: item.label,
                                item: item.href ? `https://rustbaselab.com${item.href}` : undefined,
                            })),
                        ],
                    }),
                }}
            />
        </nav>
    )
}
