"use client";

import React, { useState, useEffect } from "react";
import c from "./Scenarios.module.css";
import { scenariosService, type Scenario } from "@/services/scenarios";
import { authService } from "@/services/auth";

interface ScenariosProps {
  onScenarioSelect?: (scenario: Scenario) => void;
  isAuthenticated?: boolean;
}

export const Scenarios: React.FC<ScenariosProps> = ({ onScenarioSelect, isAuthenticated }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && authService.isAuthenticated()) {
      loadScenarios();
    }
  }, [isAuthenticated]);

  const loadScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const scenariosData = await scenariosService.getAllScenarios();
      setScenarios(scenariosData);
      console.log('Scenarios loaded:', scenariosData);
    } catch (error) {
      console.error('Failed to load scenarios:', error);
      setError('Не удалось загрузить сценарии');
    } finally {
      setLoading(false);
    }
  };

  const handleScenarioClick = (scenario: Scenario) => {
    if (onScenarioSelect) {
      onScenarioSelect(scenario);
    }
    console.log('Selected scenario:', scenario);
  };

  if (!isAuthenticated) {
    return (
      <div className={c.container}>
        <div className={c.authRequired}>Войдите в систему, чтобы увидеть сценарии</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={c.container}>
        <div className={c.loading}>Загрузка сценариев...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={c.container}>
        <div className={c.error}>
          {error}
          <button onClick={loadScenarios} className={c.retryButton}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (scenarios.length === 0) {
    return (
      <div className={c.container}>
        <div className={c.empty}>Сценарии не найдены</div>
      </div>
    );
  }

  return (
    <div className={c.container}>
      <h3 className={c.title}>Сценарии</h3>
      <div className={c.scenariosList}>
        {scenarios.map((scenario) => (
          <div
            key={scenario.scenarioId}
            className={c.scenarioItem}
            onClick={() => handleScenarioClick(scenario)}
          >
            <div className={c.scenarioTitle}>{scenario.title}</div>
            <div className={c.scenarioType}>
              Тип: {scenario.scenarioType.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};