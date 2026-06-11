import { getRandomMotivation } from '../modules/motivation';

export const scheduleNotification = async (moduleId: string, title: string, body: string, delayMinutes: number) => {
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }

  if (Notification.permission === 'granted') {
    // In a real PWA with a backend, we'd use Push API.
    // For this prototype, we'll use a simple setTimeout if the app is open,
    // or register a sync/periodic-sync if supported.
    console.log(`Scheduling notification for ${moduleId} in ${delayMinutes} minutes`);
    
    setTimeout(() => {
      const motivation = getRandomMotivation();
      new Notification(title, {
        body: `${body}\n\n"${motivation}"`,
        icon: '/icons/pwa-192x192.png',
        tag: moduleId,
      });
    }, delayMinutes * 60 * 1000);
  }
};

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};
