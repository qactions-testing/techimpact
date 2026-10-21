import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT } from '@/lib/site';

export const metadata: Metadata = { title: 'Suscripción confirmada', robots: { index: false, follow: false } };

export default function Gracias() {
  return (
    <div className="chrome-card-strong mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky">Listo</p>
      <h1 className="mt-2 text-3xl font-bold">¡Gracias por confirmar!</h1>
      <p className="mt-3 text-beige/70">Le enviaremos casos y novedades de QActions. Puede darse de baja cuando quiera desde cualquier email.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="chrome-button rounded-full px-6 py-3 font-semibold">
          Ver más casos
        </Link>
        <a href={CONTACT.calendly} className="rounded-full border border-white/20 px-6 py-3 font-semibold hover:bg-white/5">
          Agendar una demo
        </a>
      </div>
    </div>
  );
}
