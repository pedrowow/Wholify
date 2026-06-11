import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Moon, Sun, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const testNotification = () => {
    // In a real app, we'd trigger the notification through a global state or event bus
    // For this prototype, we'll just alert that notifications are configured.
    alert("In a real environment, this would trigger the motivational reminder modal.");
  };

  return (
    <div style={{ padding: 'var(--spacing-md)' }}>
      <h1>Settings</h1>
      
      <Card title="Appearance" style={{ marginBottom: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Dark Mode</span>
          <Button variant="outline" onClick={toggleTheme} size="sm">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </div>
      </Card>

      <Card title="Notifications" style={{ marginBottom: 'var(--spacing-md)' }}>
        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
          Notification permissions: {Notification.permission}
        </p>
        <Button 
          variant="secondary" 
          onClick={() => Notification.requestPermission()}
          style={{ width: '100%', marginBottom: 'var(--spacing-sm)' }}
        >
          Request Browser Permission
        </Button>
        <Button 
          variant="outline" 
          onClick={testNotification}
          style={{ width: '100%' }}
        >
          <Bell size={18} /> Test Reminder Modal
        </Button>
      </Card>
    </div>
  );
};

export default Settings;
