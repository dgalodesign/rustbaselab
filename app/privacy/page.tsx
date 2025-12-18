
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Política de Privacidad - RustBaseLab",
  description: "Política de privacidad y protección de datos de RustBaseLab",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8 text-balance">Política de Privacidad</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-sm text-muted-foreground">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">1. Información que Recopilamos</h2>
            <p>En RustBaseLab, recopilamos información limitada para mejorar tu experiencia en nuestro sitio web:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Información de navegación (páginas visitadas, tiempo de permanencia)</li>
              <li>Datos técnicos (tipo de navegador, sistema operativo, dirección IP)</li>
              <li>Preferencias de idioma y configuración del sitio</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">2. Uso de Cookies</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio
              </li>
              <li>
                <strong>Cookies de análisis:</strong> Google Analytics para entender cómo usas nuestro sitio
              </li>
              <li>
                <strong>Cookies de publicidad:</strong> Google AdSense para mostrar anuncios relevantes
              </li>
            </ul>
            <p>
              Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">3. Google AdSense</h2>
            <p>
              Este sitio utiliza Google AdSense para mostrar anuncios. Google utiliza cookies para servir anuncios
              basados en tus visitas previas a este sitio web y otros sitios en Internet.
            </p>
            <p>
              Puedes inhabilitar el uso de cookies de Google visitando la{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Configuración de anuncios de Google
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">4. Google Analytics</h2>
            <p>
              Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Google Analytics recopila
              información de forma anónima sobre cómo los visitantes usan nuestro sitio.
            </p>
            <p>
              Para más información sobre cómo Google utiliza los datos, visita{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Política de Privacidad de Google
              </a>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">5. Almacenamiento de Datos</h2>
            <p>
              Utilizamos Supabase para almacenar información sobre las bases de Rust mostradas en el sitio. No
              almacenamos información personal de los usuarios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">6. Enlaces a Terceros</h2>
            <p>
              Nuestro sitio contiene enlaces a sitios web de terceros (como YouTube para videos). No somos responsables
              de las prácticas de privacidad de estos sitios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">7. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a la información que tenemos sobre ti</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">8. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cualquier cambio
              publicando la nueva política en esta página.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">9. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de nuestra{" "}
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
