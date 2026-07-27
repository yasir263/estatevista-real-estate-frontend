import { Agent } from '@/types/agent';
import { MOCK_AGENTS } from '../mock/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const agentAdapter = {
  async getAgents(): Promise<Agent[]> {
    await delay(150);
    return MOCK_AGENTS;
  },

  async getAgentById(id: string): Promise<Agent | null> {
    await delay(150);
    return MOCK_AGENTS.find(a => a.id === id) || null;
  }
};
