import { apiClient } from '@/utils/apiClient';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  experience: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  icon?: string;
  category?: string;
}

export interface ExperienceAchievementsResponse {
  achievements: Achievement[];
  totalExperience: number;
  userLevel?: number;
  nextLevelExperience?: number;
}

class AchievementsService {
  private static instance: AchievementsService;

  private constructor() {}

  static getInstance(): AchievementsService {
    if (!AchievementsService.instance) {
      AchievementsService.instance = new AchievementsService();
    }
    return AchievementsService.instance;
  }

  async getExperienceAchievements(userId: number | string): Promise<ExperienceAchievementsResponse> {
    try {
      const response = await apiClient.get<ExperienceAchievementsResponse>(
        `/achievements/${userId}/give-experience-achievements`
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch experience achievements:', error);
      throw error;
    }
  }

  async getAllAchievements(userId: number | string): Promise<Achievement[]> {
    try {
      const response = await apiClient.get<Achievement[]>(`/achievements/${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch all achievements:', error);
      throw error;
    }
  }

  async unlockAchievement(userId: number | string, achievementId: string): Promise<Achievement> {
    try {
      const response = await apiClient.post<Achievement>(
        `/achievements/${userId}/unlock/${achievementId}`
      );
      return response;
    } catch (error) {
      console.error('Failed to unlock achievement:', error);
      throw error;
    }
  }
}

export const achievementsService = AchievementsService.getInstance();