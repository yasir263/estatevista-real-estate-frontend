import { MOCK_AGENCIES } from '@/services/mock/data';
import AgencyProfileClient from './AgencyProfileClient';

export function generateStaticParams() {
  return MOCK_AGENCIES.flatMap((a) => [{ id: a.id }, { id: a.slug }]);
}

export default async function AgencyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AgencyProfileClient id={id} />;
}
