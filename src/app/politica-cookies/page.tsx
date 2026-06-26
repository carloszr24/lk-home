import Link from 'next/link'
import { LegalPageShell } from '@/components/legal/LegalPageShell'
import { AGENT } from '@/lib/contact'
import { ADMIN_COOKIE_NAME } from '@/lib/admin-session'

export const metadata = {
  title: `Política de cookies | ${AGENT.name}`,
  description: `Información sobre el uso de cookies en el sitio web de ${AGENT.name}.`,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl text-stone-900 mb-4 text-left">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export default function PoliticaCookiesPage() {
  return (
    <LegalPageShell eyebrow="Legal" title="Política de cookies">
      <Section title="¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos que se almacenan en su dispositivo cuando visita un sitio web. Su
          finalidad puede ser técnica, de seguridad o, en otros casos, analítica o publicitaria.
        </p>
      </Section>

      <Section title="¿Qué cookies utiliza esta web?">
        <p>
          En el sitio web de <strong>{AGENT.name}</strong> utilizamos únicamente cookies estrictamente necesarias
          para el funcionamiento del servicio. <strong>No empleamos cookies de publicidad ni de análisis de
          comportamiento</strong> (como Google Analytics) en la versión actual de la web.
        </p>
        <div className="overflow-x-auto text-left">
          <table className="w-full border-collapse border border-stone-200 text-xs md:text-sm">
            <thead>
              <tr className="bg-stone-50">
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Cookie</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Tipo</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Finalidad</th>
                <th className="border border-stone-200 px-3 py-2 text-left font-medium text-stone-900">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-stone-200 px-3 py-2 align-top">{ADMIN_COOKIE_NAME}</td>
                <td className="border border-stone-200 px-3 py-2 align-top">Técnica / sesión</td>
                <td className="border border-stone-200 px-3 py-2 align-top">
                  Permite mantener la sesión del panel de administración de la web cuando un usuario autorizado
                  accede a <code className="text-stone-800">/admin</code>. No se utiliza en la navegación
                  ordinaria del sitio.
                </td>
                <td className="border border-stone-200 px-3 py-2 align-top">Hasta 7 días</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          El proveedor de alojamiento de la web (Vercel) o los enlaces externos que usted decida abrir (por
          ejemplo, mapas de Google o WhatsApp) pueden utilizar sus propias cookies, sobre las que {AGENT.name}{' '}
          no tiene control. Le recomendamos consultar las políticas de privacidad de dichos servicios.
        </p>
      </Section>

      <Section title="¿Cómo puede gestionar o eliminar las cookies?">
        <p>
          Puede permitir, bloquear o eliminar las cookies desde la configuración de su navegador. Tenga en
          cuenta que la desactivación de cookies técnicas puede afectar al correcto funcionamiento de
          determinadas partes del sitio, como el acceso al panel de administración.
        </p>
        <p>
          En los navegadores más habituales, la gestión de cookies suele encontrarse en el menú de
          «Preferencias», «Privacidad» o «Configuración».
        </p>
      </Section>

      <Section title="Más información">
        <p>
          Para conocer el tratamiento de sus datos personales, consulte nuestra{' '}
          <Link href="/politica-privacidad" className="text-brand-red hover:underline">
            Política de privacidad
          </Link>
          .
        </p>
      </Section>

      <Section title="Actualización de la política de cookies">
        <p>
          Esta política puede actualizarse cuando se incorporen nuevas funcionalidades o servicios a la web.
          La versión vigente será siempre la publicada en esta página.
        </p>
      </Section>
    </LegalPageShell>
  )
}
