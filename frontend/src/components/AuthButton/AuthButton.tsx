"use client";

import { achievementsService, type ExperienceAchievementsResponse } from "@/services/achievements";
import { authService } from "@/services/auth";
import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import c from "./AuthButton.module.css";

declare global {
  interface Window {
    WebApp?: {
      initData?: string;
      initDataUnsafe?: {
        user?: {
          id: number;
          first_name?: string;
          last_name?: string;
          username?: string;
        };
        start_param?: string;
      };
      ready?: () => void;
      expand?: () => void;
    };
  }
}

interface UserData {
  id: number;
  name?: string;
  username?: string;
  [key: string]: any;
}

export const AuthButton = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [webApp, setWebApp] = useState<any>(null);
  const [achievements, setAchievements] = useState<ExperienceAchievementsResponse | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.WebApp) {
      const app = window.WebApp;
      setWebApp(app);
      if (app.ready) {
        app.ready();
      }

      if (authService.isAuthenticated() && app.initDataUnsafe?.user?.id) {
        const userId = app.initDataUnsafe.user.id;
        fetchUserData(userId)
          .then(async userData => {
            setUser(userData);
            await fetchUserAchievements(userId);
          })
          .catch(() => {
            setUser({ id: userId });
          });
      }
    }
  }, []);

  const fetchUserData = async (userId: number): Promise<UserData> => {
    return await apiClient.get<UserData>(`/users/${userId}`);
  };

  const fetchUserAchievements = async (userId: number): Promise<void> => {
    try {
      const achievementsData = await achievementsService.getExperienceAchievements(userId);
      setAchievements(achievementsData);
      console.log('Achievements loaded:', achievementsData);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    }
  };

  const handleAuth = async () => {
    if (!webApp) {
      console.error('Max WebApp не инициализирован');
      return;
    }

    setLoading(true);
    try {
      const userId = webApp.initDataUnsafe?.user?.id;

      if (!userId) {
        throw new Error('Не удалось получить ID пользователя');
      }

      try {
        const data = await authService.signIn(userId);
        console.log('Вход успешен:', data);

        const userData = await fetchUserData(userId);
        setUser(userData);

        await fetchUserAchievements(userId);
        return;
      } catch (signInError) {
        console.log('Пользователь не найден, регистрируем...');

        try {
          const signUpData = await authService.signUp(userId);
          console.log('Регистрация успешна:', signUpData);

          const userData = await fetchUserData(userId);
          setUser(userData);

          await fetchUserAchievements(userId);
        } catch (signUpError) {
          throw new Error(`Ошибка при авторизации: ${signUpError instanceof Error ? signUpError.message : 'Неизвестная ошибка'}`);
        }
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setAchievements(null);
    authService.clearTokens();
  };

  if (user) {
    return (
      <div className={c.userInfo}>
        <span>{user.name || user.username || `ID: ${user.id}`}</span>
        {achievements && (
          <span className={c.achievementInfo}>
            XP: {achievements.totalExperience}
          </span>
        )}
        <button onClick={handleSignOut} className={c.signOutButton}>
          Выйти
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAuth}
      className={c.signInButton}
      disabled={loading}
    >
      {loading ? 'Загрузка...' : 'Войти'}
    </button>
  );
};
