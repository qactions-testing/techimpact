import type { Metadata } from 'next';
import DiscoverView from '@/components/views/DiscoverView';

export const metadata: Metadata = { title: 'Recomendados para usted', robots: { index: false, follow: true } };
export default function Page() {
  return <DiscoverView />;
}
