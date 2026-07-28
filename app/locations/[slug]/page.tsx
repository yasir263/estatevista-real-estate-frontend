import { MOCK_LOCATIONS } from '@/services/mock/data';
import LocationDetailClient from './LocationDetailClient';

export function generateStaticParams() {
  return MOCK_LOCATIONS.map((l) => ({ slug: l.slug }));
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LocationDetailClient slug={slug} />;
}
