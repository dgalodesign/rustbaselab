import Script from "next/script"

interface StructuredDataProps {
    data: Record<string, any> | Record<string, any>[]
}

/**
 * Componente para inyectar JSON-LD structured data en páginas
 * Mejora el SEO permitiendo que Google muestre rich snippets
 */
export function StructuredData({ data }: StructuredDataProps) {
    const jsonLd = Array.isArray(data) ? data : [data]

    return (
        <>
            {jsonLd.map((item, index) => (
                <Script
                    key={index}
                    id={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    )
}
