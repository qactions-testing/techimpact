import { CONTACT } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-beige/45">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <p>
            © {new Date().getFullYear()} TechImpact by{' '}
            <a href="https://qactions.com" className="text-beige/70 hover:text-beige">
              QActions
            </a>{' '}
            · Calidad que impulsa
          </p>
          <p>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-beige">
              {CONTACT.email}
            </a>{' '}
            · LATAM y España +54 9 11 6423-5643 · Paraguay +595 986 622020
          </p>
        </div>
        <div className="space-y-2 sm:text-right">
          <p>
            Las cifras de cada caso provienen de la publicación oficial del fabricante que lo firma, enlazada en la página
            del caso. Los nombres reservados respetan la confidencialidad indicada en la fuente.
          </p>
          <p>
            <a href="https://qactions.com/politica-de-privacidad/" className="underline hover:text-beige">
              Política de privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
