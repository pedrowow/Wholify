import React from 'react';
import { Card } from '../../../components/Card';
import { Button } from '../../../components/Button';
import { Edit3, Trash2, CheckCircle, Circle } from 'lucide-react';
import type { Habit } from '../data/habitsData';

interface HabitsListProps {
  habits: Habit[];
  completions: Map<string, boolean>;
  streaks: Map<string, number>;
  onToggle: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export const HabitsList: React.FC<HabitsListProps> = ({
  habits,
  completions,
  streaks,
  onToggle,
  onEdit,
  onDelete,
}) => {
  if (habits.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
      {habits.map((habit) => {
        const isCompleted = completions.get(habit.id) ?? false;
        const streak = streaks.get(habit.id) ?? 0;

        return (
          <Card
            key={habit.id}
            style={{
              opacity: isCompleted ? 0.85 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-sm)',
              }}
            >
              {/* Completion toggle */}
              <button
                onClick={() => onToggle(habit.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: isCompleted
                    ? 'var(--color-success)'
                    : 'var(--color-border)',
                  transition: 'color 0.2s ease',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
                aria-label={
                  isCompleted
                    ? `Mark ${habit.name} as incomplete`
                    : `Mark ${habit.name} as complete`
                }
              >
                {isCompleted ? (
                  <CheckCircle size={28} />
                ) : (
                  <Circle size={28} />
                )}
              </button>

              {/* Habit info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)',
                    marginBottom: '2px',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{habit.icon}</span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      opacity: isCompleted ? 0.7 : 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {habit.name}
                  </h3>
                </div>

                {/* Reminder times */}
                {habit.reminderTimes.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'var(--spacing-xs)',
                      marginTop: 'var(--spacing-xs)',
                    }}
                  >
                    {habit.reminderTimes.map((time) => (
                      <span
                        key={time}
                        style={{
                          fontSize: '0.75rem',
                          padding: '1px 6px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--color-border)',
                          opacity: 0.8,
                        }}
                      >
                        🔔 {time}
                      </span>
                    ))}
                  </div>
                )}

                {/* Streak */}
                <div
                  style={{
                    marginTop: 'var(--spacing-xs)',
                    fontSize: '0.8rem',
                    opacity: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>🔥 {streak} day{streak !== 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-xs)',
                  flexShrink: 0,
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(habit)}
                  aria-label={`Edit ${habit.name}`}
                >
                  <Edit3 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(habit.id)}
                  aria-label={`Delete ${habit.name}`}
                  style={{ color: 'var(--color-accent)' }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};