'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, Compass, LayoutGrid, MessageCircle, User } from 'lucide-react';
import { useMounted, useSavedCases } from '@/lib/client';
import { VendorLogo } from './ui';
import WhatsAppLink from './WhatsAppLink';

const NAV = [
  { href: '/', label: 'Explorar', icon: LayoutGrid },
  { href: '/para-usted', label: 'Para usted', icon: Compass },
  { href: '/guardados', label: 'Guardados', icon: Bookmark },
  { href: '/perfil', label: 'Perfil', icon: User },
];

export default function Header() {
  const pathname = usePathname();
  const mounted = useMounted();
  const { savedIds } = useSavedCases();
  const count = mounted ? savedIds.length : 0;
  const isActive = (href: string) =>
    href === '/' ? !NAV.slice(1).some((n) => pathname.startsWith(n.href)) : pathname.startsWith(href);

  return (
    <>
      <header className="no-print sticky top-0 z-40 border-b border-white/10 bg-ink-deep/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="https://qactions.com" aria-label="QActions, ir al sitio principal">
              <VendorLogo id="qactions" size="sm" />
            </a>
            <Link href="/" className="text-lg font-bold tracking-tight" aria-label="TechImpact, casos de éxito">
              Tech<span className="text-title">Impact</span>
            </Link>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(href) ? 'bg-white/10 text-beige' : 'text-beige/60 hover:text-beige'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {href === '/guardados' && count > 0 && (
                  <span className="rounded-full bg-aqua px-1.5 text-[10px] font-bold text-ink">{count}</span>
                )}
              </Link>
            ))}
          </nav>
          <WhatsAppLink
            placement="header"
            className="chrome-button hidden items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold sm:flex"
          >
            <MessageCircle className="h-4 w-4" /> Hablemos
          </WhatsAppLink>
        </div>
      </header>

      <nav
        aria-label="Principal"
        className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-deep/85 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur-xl md:hidden"
      >
        <div className="grid grid-cols-4">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={`relative flex flex-col items-center gap-1 pt-3 text-[10px] font-semibold tracking-wide uppercase ${
                isActive(href) ? 'text-aqua' : 'text-beige/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
              {href === '/guardados' && count > 0 && (
                <span className="absolute top-2 left-1/2 ml-2 rounded-full bg-aqua px-1.5 text-[9px] font-bold text-ink">
                  {count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
