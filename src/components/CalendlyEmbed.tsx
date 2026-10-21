'use client';

import { useEffect, useRef } from 'react';
import { apiPath, CONTACT } from '@/lib/site';
import { getAttribution, track } from '@/lib/client';

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: Record<string, unknown>) => void };
  }
}

const SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

/**
 * Loaded only after the visitor asks for the calendar (Calendly sets its own
 * cookies). A booking is reported to GA4 and to /api/demo, which re-reads the
 * invitee from the Calendly API before touching Brevo: the browser message
 * alone is never trusted.
 */
export default function CalendlyEmbed({
  caseId,
  caseTitle,
  prefill,
}: {
  caseId: string;
  caseTitle: string;
  prefill?: { name?: string; email?: string };
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = getAttribution();
    const init = () =>
      window.Calendly?.initInlineWidget({
        url: `${CONTACT.calendly}?hide_gdpr_banner=1&primary_color=283890`,
        parentElement: ref.current,
        prefill: { name: prefill?.name, email: prefill?.email, customAnswers: { a1: `Caso: ${caseTitle}` } },
        utm: {
          utmSource: a.utm_source ?? 'techimpact',
          utmMedium: a.utm_medium ?? 'casos-de-exito',
          utmCampaign: a.utm_campaign,
          utmContent: caseId,
          utmTerm: a.utm_term,
        },
      });

    if (window.Calendly) init();
    else {
      const s = document.createElement('script');
      s.src = SCRIPT;
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    }

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com' || e.data?.event !== 'calendly.event_scheduled') return;
      track('calendly_booking', { case_id: caseId });
      fetch(apiPath('/api/demo'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ inviteeUri: e.data.payload?.invitee?.uri, caseId, attribution: getAttribution() }),
        keepalive: true,
      }).catch(() => {});
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  return <div ref={ref} className="h-[700px] min-w-[300px] overflow-hidden rounded-2xl bg-white" />;
}
