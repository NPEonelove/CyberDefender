import { apiClient } from '@/utils/apiClient';

export interface ScenarioType {
  typeId: string;
  title: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  scenarioType: ScenarioType;
}

export type ScenariosResponse = Scenario[];

class ScenariosService {
  private static instance: ScenariosService;

  private constructor() {}

  static getInstance(): ScenariosService {
    if (!ScenariosService.instance) {
      ScenariosService.instance = new ScenariosService();
    }
    return ScenariosService.instance;
  }

  async getAllScenarios(): Promise<ScenariosResponse> {
    try {
      const response = await apiClient.get<ScenariosResponse>('/scenarios');
      return response;
    } catch (error) {
      console.error('Failed to fetch scenarios:', error);
      throw error;
    }
  }

  async getScenarioById(scenarioId: string): Promise<Scenario> {
    try {
      const response = await apiClient.get<Scenario>(`/scenarios/${scenarioId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch scenario by ID:', error);
      throw error;
    }
  }

  async getScenariosByType(typeId: string): Promise<ScenariosResponse> {
    try {
      const response = await apiClient.get<ScenariosResponse>(`/scenarios/type/${typeId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch scenarios by type:', error);
      throw error;
    }
  }
}

export const scenariosService = ScenariosService.getInstance();