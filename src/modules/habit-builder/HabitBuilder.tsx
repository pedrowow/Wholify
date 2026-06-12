import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useHabits } from './components/useHabits';
import { HabitForm } from './components/HabitForm';
import { HabitsDashboard } from './components/HabitsDashboard';
import { HabitsList } from './components/HabitsList';
import { Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import type { Habit } from './data/habitsData';

const HabitBuilder: React.FC = () => {
  const {
    habits,
    completions,
    streaks,
    loading,
    error,
    motivation,
    completedCount,
    totalCount,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    refresh,
  } = useHabits();

  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleAddHabit = async (data: {
    name: string;
    icon: string;
    reminderTimes: string[];
    snoozeMinutes: number;
    enabled: boolean;
  }) => {
    try {
      setActionError(null);
      await addHabit(data);
      setShowForm(false);
    } catch (err) {
      setActionError('Failed to add habit');
    }
  };

  const handleEditHabit = async (data: {
    name: string;
    icon: string;
    reminderTimes: string[];
    snoozeMinutes: number;
    enabled: boolean;
  }) => {
    if (!editingHabit) return;
    try {
      setActionError(null);
      await updateHabit(editingHabit.id, data);
      setEditingHabit(null);
    } catch (err) {
      setActionError('Failed to update habit');
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (window.confirm('Are you sure you want to delete this habit? All history will be lost.')) {
      try {
        setActionError(null);
        await deleteHabit(habitId);
      } catch (err) {
        setActionError('Failed to delete habit');
      }
    }
  };

  const handleToggleCompletion = async (habitId: string) => {
    try {
      setActionError(null);
      await toggleCompletion(habitId);
    } catch (err) {
      setActionError('Failed to update completion status');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
        <div
          style={{
            padding: 'var(--spacing-xl)',
            color: 'var(--color-text)',
            opacity: 0.7,
          }}
          role="status"
          aria-label="Loading habits"
        >
          Loading your habits...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 'var(--spacing-md)' }}>
        <Card title="Error" icon="⚠️">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            <AlertTriangle size={32} style={{ color: 'var(--color-accent)' }} />
            <p style={{ textAlign: 'center', margin: 0 }}>{error}</p>
            <Button onClick={refresh} variant="primary">
              <RefreshCw size={16} /> Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ padding: 'var(--spacing-md)', paddingBottom: 'calc(var(--spacing-xl) * 2)' }}>
      {/* Header */}
      <header
        style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        <h1 style={{ color: 'var(--color-primary)', margin: '0 0 var(--spacing-xs) 0', fontSize: '1.5rem' }}>
          🏗️ Habit Builder
        </h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.875rem' }}>{todayLabel}</p>
        <p
          style={{
            fontStyle: 'italic',
            fontSize: '0.875rem',
            opacity: 0.8,
            margin: 'var(--spacing-sm) 0 0 0',
            color: 'var(--color-secondary)',
          }}
        >
          "{motivation}"
        </p>
      </header>

      {/* Error banner */}
      {actionError && (
        <div
          style={{
            color: 'var(--color-accent)',
            fontSize: '0.875rem',
            marginBottom: 'var(--spacing-sm)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: 'rgba(214, 125, 97, 0.1)',
            borderRadius: 'var(--border-radius)',
            textAlign: 'center',
          }}
          role="alert"
        >
          {actionError}
        </div>
      )}

      {/* Dashboard / Progress Summary */}
      <HabitsDashboard
        completedCount={completedCount}
        totalCount={totalCount}
        habits={habits}
        streaks={streaks}
        completions={completions}
        motivation={motivation}
      />

      {/* Action buttons */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
          style={{ flex: 1 }}
          aria-label="Add new habit"
        >
          <Plus size={18} /> New Habit
        </Button>
        <Button
          onClick={refresh}
          variant="outline"
          aria-label="Refresh habits"
        >
          <RefreshCw size={18} />
        </Button>
      </div>

      {/* Empty state */}
      {habits.length === 0 && !showForm && (
        <Card icon="🌟" title="Welcome to Habit Builder!">
          <p style={{ opacity: 0.8, margin: 0 }}>
            Start building lasting habits. Click "New Habit" above to create your first mini-habit —
            whether it's journaling, stretching, drinking water, or anything else you want to do daily.
          </p>
        </Card>
      )}

      {/* Habit list */}
      {habits.length > 0 && (
        <HabitsList
          habits={habits}
          completions={completions}
          streaks={streaks}
          onToggle={handleToggleCompletion}
          onEdit={(habit: Habit) => setEditingHabit(habit)}
          onDelete={handleDeleteHabit}
        />
      )}

      {/* Add form modal */}
      {showForm && (
        <HabitForm
          onSubmit={handleAddHabit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit form modal */}
      {editingHabit && (
        <HabitForm
          initialName={editingHabit.name}
          initialIcon={editingHabit.icon}
          initialTimes={editingHabit.reminderTimes}
          initialSnooze={editingHabit.snoozeMinutes}
          onSubmit={handleEditHabit}
          onCancel={() => setEditingHabit(null)}
        />
      )}
    </div>
  );
};

export default HabitBuilder;