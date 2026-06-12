import React from 'react';
import { Card } from '../../../components/Card';
import type { Habit } from '../data/habitsData';

interface HabitsDashboardProps {
  completedCount: number;
  totalCount: number;
  habits: Habit[];
  streaks: Map<string, number>;
  completions: Map<string, boolean>;
  motivation: string;
}

export const HabitsDashboard: React.FC<HabitsDashboardProps> = ({
  completedCount,
  totalCount,
  habits,
  streaks,
  completions,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div style={{ marginBottom: 'var(--spacing-md)' }}>
      <Card>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 'var(--spacing-sm)',
            textAlign: 'center',
          }}
        >
          {/* Today's Progress */}
          <div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
              }}
              aria-label={`${completedCount} of ${totalCount} habits completed`}
            >
              {completedCount}/{totalCount}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Today</div>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${percentage}% complete`}
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: percentage === 100
                    ? 'var(--color-success)'
                    : 'var(--color-primary)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease, background-color 0.3s ease',
                }}
              />
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '4px' }}>
              {percentage}%
            </div>
          </div>

          {/* Best Streak */}
          <div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
              }}
              aria-label="Best streak"
            >
              {Math.max(...Array.from(streaks.values()), 0)}🔥
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Best Streak</div>
          </div>
        </div>

        {/* Per-habit mini streaks */}
        {habits.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-xs)',
              marginTop: 'var(--spacing-sm)',
              justifyContent: 'center',
            }}
          >
            {habits.map((habit) => {
              const streak = streaks.get(habit.id) ?? 0;
              const isDone = completions.get(habit.id) ?? false;
              return (
                <div
                  key={habit.id}
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: isDone
                      ? 'rgba(148, 166, 132, 0.2)'
                      : 'transparent',
                    border: '1px solid var(--color-border)',
                    opacity: isDone ? 1 : 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {habit.icon} {streak}d
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};