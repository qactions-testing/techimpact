'use client';

import React from 'react';
import { apiPath } from '@/lib/site';
import { track } from '@/lib/client';

/**
 * Goes through /api/wa so the server picks the number by country (Paraguay or
 * LATAM/España) and builds the prefilled message. The click is tracked first.
 */
export default function WhatsAppLink({
  caseSlug,
  caseId,
  placement,
  className,
  children,
}: {
  caseSlug?: string;
  caseId?: string;
  placement: string;
  className?: string;
  children: React.ReactNode;
}) {
  const href = apiPath(`/api/wa${caseSlug ? `?caso=${encodeURIComponent(caseSlug)}` : ''}`);
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener"
      className={className}
      onClick={() => track('whatsapp_click', { placement, case_id: caseId })}
    >
      {children}
    </a>
  );
}
