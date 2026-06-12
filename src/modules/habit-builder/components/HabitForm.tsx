import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { X, Plus } from 'lucide-react';

interface HabitFormProps {
  initialName?: string;
  initialIcon?: string;
  initialTimes?: string[];
  initialSnooze?: number;
  onSubmit: (data: {
    name: string;
    icon: string;
    reminderTimes: string[];
    snoozeMinutes: number;
    enabled: boolean;
  }) => void;
  onCancel: () => void;
}

const COMMON_ICONS = [
  '📝', '💪', '🧘', '📖', '🎯', '🏃', '💧', '😴',
  '🌅', '🌿', '🎵', '✍️', '🧠', '❤️', '🙏', '☀️',
];

const HABIT_NAME_SUGGESTIONS = [
  'Journaling', 'Meditation', 'Exercise', 'Reading', 'Stretching',
  'Drink Water', 'Gratitude', 'Walk', 'Studying', 'Practice',
];

export const HabitForm: React.FC<HabitFormProps> = ({
  initialName = '',
  initialIcon = '📝',
  initialTimes = ['09:00'],
  initialSnooze = 15,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialName);
  const [icon, setIcon] = useState(initialIcon);
  const [reminderTimes, setReminderTimes] = useState<string[]>(initialTimes);
  const [snoozeMinutes, setSnoozeMinutes] = useState(initialSnooze);
  const [error, setError] = useState<string | null>(null);

  const handleAddTime = () => {
    setReminderTimes([...reminderTimes, '12:00']);
  };

  const handleRemoveTime = (index: number) => {
    setReminderTimes(reminderTimes.filter((_, i) => i !== index));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...reminderTimes];
    newTimes[index] = value;
    setReminderTimes(newTimes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a habit name');
      return;
    }
    if (reminderTimes.length === 0) {
      setError('Please add at least one reminder time');
      return;
    }
    setError(null);
    onSubmit({
      name: name.trim(),
      icon,
      reminderTimes,
      snoozeMinutes,
      enabled: true,
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setName(suggestion);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 2000,
        padding: 'var(--spacing-md)',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--border-radius)',
          padding: 'var(--spacing-lg)',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={initialName ? 'Edit habit' : 'Add new habit'}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-md)',
          }}
        >
          <h2 style={{ margin: 0 }}>
            {initialName ? 'Edit Habit' : 'New Habit'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                color: 'var(--color-accent)',
                fontSize: '0.875rem',
                marginBottom: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm)',
                backgroundColor: 'rgba(214, 125, 97, 0.1)',
                borderRadius: 'var(--border-radius)',
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label
              htmlFor="habit-name"
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-xs)',
                fontWeight: 500,
              }}
            >
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Journaling, Stretching..."
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
              }}
              aria-label="Habit name"
            />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-xs)',
                marginTop: 'var(--spacing-xs)',
              }}
            >
              {HABIT_NAME_SUGGESTIONS.filter((s) => s !== name).slice(0, 5).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    opacity: 0.7,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
              Icon
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-xs)',
              }}
              role="radiogroup"
              aria-label="Choose habit icon"
            >
              {COMMON_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  style={{
                    fontSize: '1.5rem',
                    padding: '4px 8px',
                    borderRadius: 'var(--border-radius)',
                    border: icon === emoji ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    backgroundColor: icon === emoji ? 'rgba(59,112,128,0.1)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label={`Select icon ${emoji}`}
                  aria-pressed={icon === emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 500 }}>
              Reminder Times
            </label>
            {reminderTimes.map((time, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-xs)',
                  marginBottom: 'var(--spacing-xs)',
                  alignItems: 'center',
                }}
              >
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(index, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-main)',
                    fontSize: '1rem',
                  }}
                  aria-label={`Reminder time ${index + 1}`}
                />
                {reminderTimes.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTime(index)}
                    aria-label={`Remove time ${index + 1}`}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddTime}
              style={{ marginTop: 'var(--spacing-xs)' }}
            >
              <Plus size={16} /> Add Time
            </Button>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label
              htmlFor="snooze-minutes"
              style={{
                display: 'block',
                marginBottom: 'var(--spacing-xs)',
                fontWeight: 500,
              }}
            >
              Snooze Duration (minutes)
            </label>
            <select
              id="snooze-minutes"
              value={snoozeMinutes}
              onChange={(e) => setSnoozeMinutes(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
              }}
              aria-label="Snooze duration"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <Button type="submit" variant="primary" style={{ flex: 1 }}>
              {initialName ? 'Save Changes' : 'Add Habit'}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};