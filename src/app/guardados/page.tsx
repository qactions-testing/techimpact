import type { Metadata } from 'next';
import { Suspense } from 'react';
import SavedView from '@/components/views/SavedView';

export const metadata: Metadata = { title: 'Casos guardados', robots: { index: false, follow: true } };
export default function Page() {
  return (
    <Suspense>
      <SavedView />
    </Suspense>
  );
}
