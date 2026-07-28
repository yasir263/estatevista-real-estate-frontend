import { MOCK_PROPERTIES } from '@/services/mock/data';
import PropertyDetailClient from './PropertyDetailClient';

export function generateStaticParams() {
  return MOCK_PROPERTIES.flatMap((p) => [{ id: p.id }, { id: p.slug }]);
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient id={id} />;
}
