import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Clock } from 'lucide-react';

interface NotificationModalProps {
  moduleName: string;
  motivation: string;
  onSnooze: (minutes: number) => void;
  onComplete: () => void;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  moduleName,
  motivation,
  onSnooze,
  onComplete,
  onClose,
}) => {
  const snoozeOptions = [
    { label: '15m', value: 15 },
    { label: '30m', value: 30 },
    { label: '1h', value: 60 },
    { label: '2h', value: 120 },
    { label: 'Tomorrow', value: 1440 },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: 'var(--spacing-md)'
    }}>
      <Card title={`Reminder: ${moduleName}`} icon="🔔" style={{ maxWidth: '400px', width: '100%' }}>
        <p style={{ fontStyle: 'italic', margin: 'var(--spacing-md) 0', textAlign: 'center' }}>
          "{motivation}"
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <Button onClick={onComplete} variant="primary">
            I'm doing it!
          </Button>
          
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <p style={{ fontSize: '0.8rem', marginBottom: 'var(--spacing-xs)', opacity: 0.7 }}>Snooze for:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
              {snoozeOptions.map(opt => (
                <Button 
                  key={opt.value} 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSnooze(opt.value)}
                >
                  <Clock size={14} /> {opt.label}
                </Button>
              ))}
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onClose} style={{ marginTop: 'var(--spacing-sm)' }}>
            Dismiss
          </Button>
        </div>
      </Card>
    </div>
  );
};
