interface StructuredDataProps {
    data: Record<string, any> | Record<string, any>[]
}

/**
 * Renders JSON-LD structured data inline in the SSR HTML so crawlers
 * (including Googlebot) see it in the initial page source.
 */
export function StructuredData({ data }: StructuredDataProps) {
    const jsonLd = Array.isArray(data) ? data : [data]

    return (
        <>
            {jsonLd.map((item, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    )
}
