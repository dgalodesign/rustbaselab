
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
            <h2 className="text-2xl font-bold font-display text-foreground">5. Uso de Google OAuth y Datos de Usuario de Google</h2>
            <p>
              RustBaseLab Dashboard (<a href="https://dashboard.rustbaselab.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">dashboard.rustbaselab.com</a>) utiliza Google OAuth para autenticación y vinculación de canales de YouTube. El uso de datos obtenidos a través de las APIs de Google cumple con la{" "}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Política de Datos de Usuario de los Servicios de API de Google
              </a>
              , incluyendo los requisitos de Uso Limitado.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-4">5.1 Datos Accedidos</h3>
            <p>A través de Google OAuth accedemos a los siguientes datos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Autenticación (via Supabase):</strong> Dirección de correo electrónico y nombre completo proporcionados por Google al iniciar sesión.</li>
              <li><strong>YouTube (scope <code>youtube.readonly</code>):</strong> ID del canal de YouTube, nombre del canal, handle personalizado (@usuario), URL de miniatura del canal e ID de la playlist de subidas. Este acceso es temporal y solo se utiliza durante el proceso de vinculación del canal.</li>
            </ul>
            <p className="mt-2">No accedemos a Google Calendar, Google Drive, Gmail ni ningún otro servicio de Google más allá de lo indicado.</p>

            <h3 className="text-xl font-semibold text-foreground mt-4">5.2 Uso de los Datos</h3>
            <p>Los datos de Google se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Autenticar tu identidad y gestionar tu sesión en el Dashboard.</li>
              <li>Identificar y vincular tu canal de YouTube a tu perfil de creador.</li>
              <li>Mostrar el nombre y avatar de tu canal en la interfaz del Dashboard.</li>
              <li>Obtener metadatos públicos de tus videos (títulos, descripciones, miniaturas) para su gestión dentro de la plataforma.</li>
            </ul>
            <p className="mt-2">
              Los tokens de acceso de OAuth se usan únicamente durante el proceso de vinculación y <strong>no se almacenan</strong> en ninguna base de datos.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-4">5.3 Compartición de Datos</h3>
            <p>
              Los datos de usuario de Google <strong>no se comparten con terceros</strong>. No vendemos, alquilamos ni cedemos esta información. Los únicos servicios que procesan datos dentro de la plataforma son:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> Almacenamiento seguro de datos de autenticación e información del canal.</li>
              <li><strong>Google Gemini API:</strong> Recibe únicamente títulos de videos (sin datos de usuario de Google) para sugerencias de optimización SEO.</li>
              <li><strong>Vercel Analytics:</strong> Métricas de uso anónimas, sin datos personales de Google.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-4">5.4 Almacenamiento y Protección de Datos</h3>
            <p>Los datos de Google almacenados de forma persistente son:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Correo electrónico y nombre completo (en Supabase Auth, cifrados en reposo).</li>
              <li>ID del canal de YouTube, nombre del canal y URL del avatar (en la base de datos de Supabase).</li>
            </ul>
            <p className="mt-2">
              Toda la comunicación se realiza mediante HTTPS/TLS. Supabase implementa cifrado en reposo y controles de acceso mediante Row Level Security (RLS). Los tokens OAuth no se persisten en ningún momento.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-4">5.5 Retención y Eliminación de Datos</h3>
            <p>
              Los datos se conservan mientras tu cuenta esté activa. Puedes solicitar la eliminación de tu cuenta y tus datos en cualquier momento desde los ajustes del Dashboard o contactándonos en{" "}
              <a href="mailto:rustbaselab@gmail.com" className="text-primary hover:underline">rustbaselab@gmail.com</a>.
              Al eliminar tu cuenta, tus datos de autenticación de Google (email, nombre) se eliminan de Supabase Auth de forma inmediata.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">6. Almacenamiento de Datos</h2>
            <p>
              Utilizamos Supabase para almacenar la información necesaria para el funcionamiento de la plataforma,
              incluyendo datos de autenticación (correo electrónico, nombre) y datos del canal de YouTube vinculado
              (ID del canal, nombre, avatar). Consulta la sección 5.4 para más detalles sobre protección de datos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">7. Enlaces a Terceros</h2>
            <p>
              Nuestro sitio contiene enlaces a sitios web de terceros (como YouTube para videos). No somos responsables
              de las prácticas de privacidad de estos sitios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">8. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acceder a la información que tenemos sobre ti</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
            </ul>
            <p className="mt-2">
              Para ejercer cualquiera de estos derechos, contáctanos en{" "}
              <a href="mailto:rustbaselab@gmail.com" className="text-primary hover:underline">rustbaselab@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">9. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cualquier cambio
              publicando la nueva política en esta página.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-display text-foreground">10. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en{" "}
              <a href="mailto:rustbaselab@gmail.com" className="text-primary hover:underline">
                rustbaselab@gmail.com
              </a>{" "}
              o a través de nuestra{" "}
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
