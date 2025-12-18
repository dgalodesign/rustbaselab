
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Términos y Condiciones - RustBaseLab",
  description: "Términos y condiciones de uso de RustBaseLab",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8 text-balance">Términos y Condiciones</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar RustBaseLab, aceptas estar sujeto a estos términos y condiciones. Si no estás de
              acuerdo con alguna parte de estos términos, no debes usar nuestro sitio web.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">2. Uso del Sitio</h2>
            <p>
              RustBaseLab es un sitio web educativo que proporciona diseños de bases y tutoriales para el videojuego
              Rust. El contenido se proporciona únicamente con fines informativos y educativos.
            </p>
            <p>Te comprometes a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usar el sitio de manera legal y apropiada</li>
              <li>No intentar acceder a áreas restringidas del sitio</li>
              <li>No interferir con el funcionamiento del sitio</li>
              <li>No copiar o redistribuir el contenido sin permiso</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">3. Propiedad Intelectual</h2>
            <p>
              El contenido de RustBaseLab, incluyendo diseños, textos, gráficos y código, está protegido por derechos de
              autor. Los videos embebidos son propiedad de sus respectivos creadores en YouTube.
            </p>
            <p>
              Rust es una marca registrada de Facepunch Studios. RustBaseLab no está afiliado con Facepunch Studios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">4. Contenido de Terceros</h2>
            <p>
              Nuestro sitio incluye videos de YouTube y enlaces a sitios externos. No somos responsables del contenido,
              políticas o prácticas de estos sitios de terceros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">5. Publicidad</h2>
            <p>
              Este sitio muestra anuncios a través de Google AdSense. Los anunciantes pueden usar cookies para
              personalizar los anuncios que ves. No controlamos el contenido de los anuncios de terceros.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">6. Descargo de Responsabilidad</h2>
            <p>
              El contenido de RustBaseLab se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos que:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>El sitio esté libre de errores o interrupciones</li>
              <li>Los diseños de bases funcionen perfectamente en el juego</li>
              <li>La información esté siempre actualizada</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">7. Limitación de Responsabilidad</h2>
            <p>
              RustBaseLab no será responsable de ningún daño directo, indirecto, incidental o consecuente que resulte
              del uso o la imposibilidad de usar nuestro sitio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">8. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación en el sitio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">9. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes aplicables en tu jurisdicción. Cualquier disputa se resolverá en los
              tribunales competentes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">10. Contacto</h2>
            <p>
              Si tienes preguntas sobre estos términos, puedes contactarnos a través de nuestra{" "}
              <a href="/contact" className="text-primary hover:underline">
                página de contacto
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
