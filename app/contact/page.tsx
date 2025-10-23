import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare } from "lucide-react"

export const metadata = {
  title: "Contacto - RustBaseLab",
  description: "Contacta con el equipo de RustBaseLab",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-balance">Contacto</h1>

        <div className="space-y-8">
          <p className="text-lg text-muted-foreground">
            ¿Tienes preguntas, sugerencias o quieres reportar un problema? Estamos aquí para ayudarte.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-2 border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Email</h2>
              </div>
              <p className="text-muted-foreground mb-4">Para consultas generales, sugerencias o reportar problemas.</p>
              <a href="mailto:contact@rustbaselab.com" className="text-primary hover:underline font-medium">
                dgalohunter@gmail.com
              </a>
            </div>

            <div className="border-2 border-border rounded-lg p-6 bg-card hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold">Feedback</h2>
              </div>
              <p className="text-muted-foreground mb-4">Comparte tus ideas para mejorar RustBaseLab.</p>
              <a href="mailto:feedback@rustbaselab.com" className="text-primary hover:underline font-medium">
                dgalohunter@gmail.com
              </a>
            </div>
          </div>

          <div className="border-2 border-border rounded-lg p-6 bg-card">
            <h2 className="text-2xl font-bold mb-4">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">¿Puedo enviar mis propios diseños de bases?</h3>
                <p className="text-muted-foreground">
                  Actualmente no aceptamos envíos de usuarios, pero estamos trabajando en esta funcionalidad. Mantente
                  atento a futuras actualizaciones.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">¿Los diseños están actualizados?</h3>
                <p className="text-muted-foreground">
                  Hacemos nuestro mejor esfuerzo para mantener los diseños actualizados con las últimas versiones de
                  Rust. Si encuentras información desactualizada, por favor contáctanos.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">¿Cómo puedo reportar un problema técnico?</h3>
                <p className="text-muted-foreground">
                  Envíanos un email a contact@rustbaselab.com con una descripción detallada del problema, incluyendo
                  capturas de pantalla si es posible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">Nota sobre Publicidad</h2>
            <p className="text-muted-foreground">
              Este sitio utiliza Google AdSense para mostrar anuncios. Si tienes problemas con anuncios específicos,
              puedes reportarlos directamente a Google a través de los controles de anuncios.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
