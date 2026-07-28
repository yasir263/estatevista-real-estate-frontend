import { MOCK_AGENTS } from '@/services/mock/data';
import AgentProfileClient from './AgentProfileClient';

export function generateStaticParams() {
  return MOCK_AGENTS.map((a) => ({ id: a.id }));
}

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AgentProfileClient id={id} />;
}
