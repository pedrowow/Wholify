import { useState, useEffect, useCallback } from 'react';
import { habitsService, type Habit } from '../data/habitsData';

export interface HabitsState {
  habits: Habit[];
  completions: Map<string, boolean>;
  streaks: Map<string, number>;
  loading: boolean;
  error: string | null;
  motivation: string;
}

export function useHabits() {
  const [state, setState] = useState<HabitsState>({
    habits: [],
    completions: new Map(),
    streaks: new Map(),
    loading: true,
    error: null,
    motivation: '',
  });

  const loadData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const habits = await habitsService.getHabits();
      const completions = await habitsService.getCompletionsForDate();
      const motivation = await habitsService.getMotivation();

      // Calculate streaks for all habits
      const streaks = new Map<string, number>();
      for (const habit of habits) {
        const streak = await habitsService.calculateStreak(habit.id);
        streaks.set(habit.id, streak);
      }

      setState({
        habits,
        completions,
        streaks,
        loading: false,
        error: null,
        motivation,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load habits',
      }));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addHabit = useCallback(
    async (habit: Omit<Habit, 'id' | 'createdAt'>) => {
      try {
        const newHabit = await habitsService.addHabit(habit);
        await loadData();
        return newHabit;
      } catch (err) {
        throw err;
      }
    },
    [loadData]
  );

  const updateHabit = useCallback(
    async (habitId: string, updates: Partial<Habit>) => {
      try {
        await habitsService.updateHabit(habitId, updates);
        await loadData();
      } catch (err) {
        throw err;
      }
    },
    [loadData]
  );

  const deleteHabit = useCallback(
    async (habitId: string) => {
      try {
        await habitsService.deleteHabit(habitId);
        await loadData();
      } catch (err) {
        throw err;
      }
    },
    [loadData]
  );

  const toggleCompletion = useCallback(
    async (habitId: string) => {
      try {
        await habitsService.toggleCompletion(habitId);
        // Reload completions and streaks
        const completions = await habitsService.getCompletionsForDate();
        const streaks = new Map(state.streaks);
        const newStreak = await habitsService.calculateStreak(habitId);
        streaks.set(habitId, newStreak);
        setState((prev) => ({ ...prev, completions, streaks }));
      } catch (err) {
        throw err;
      }
    },
    [state.streaks]
  );

  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  const completedCount = Array.from(state.completions.values()).filter(Boolean).length;
  const totalCount = state.habits.length;

  return {
    ...state,
    completedCount,
    totalCount,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    refresh,
  };
}