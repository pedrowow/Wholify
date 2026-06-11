import { useState, useCallback } from 'react';
import { getRandomMotivation } from '../modules/motivation';

interface ActiveNotification {
  moduleId: string;
  moduleName: string;
  motivation: string;
}

export const useNotifications = () => {
  const [activeNotification, setActiveNotification] = useState<ActiveNotification | null>(null);

  const showNotification = useCallback((moduleId: string, moduleName: string) => {
    setActiveNotification({
      moduleId,
      moduleName,
      motivation: getRandomMotivation()
    });
  }, []);

  const handleSnooze = (minutes: number) => {
    console.log(`Snoozing ${activeNotification?.moduleId} for ${minutes} minutes`);
    // In a real app, this would schedule a background sync or local notification
    setActiveNotification(null);
  };

  const handleComplete = () => {
    console.log(`Completed activity for ${activeNotification?.moduleId}`);
    setActiveNotification(null);
  };

  const handleClose = () => {
    setActiveNotification(null);
  };

  return {
    activeNotification,
    showNotification,
    handleSnooze,
    handleComplete,
    handleClose
  };
};
