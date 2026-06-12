import { getRandomMotivation } from '../../motivation';
import { getDB } from '../../../services/db';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  reminderTimes: string[];
  enabled: boolean;
  snoozeMinutes: number;
  createdAt: string;
}

export interface DailyCompletion {
  id: string;
  date: string;
  habitId: string;
  completed: boolean;
}

const HABITS_SETTINGS_KEY = 'habit-builder-habits';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export const habitsService = {
  async getHabits(): Promise<Habit[]> {
    const db = await getDB();
    const data = await db.get('settings', HABITS_SETTINGS_KEY);
    return (data as Habit[]) ?? [];
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    const db = await getDB();
    await db.put('settings', habits, HABITS_SETTINGS_KEY);
  },

  async addHabit(habit: Omit<Habit, 'id' | 'createdAt'>): Promise<Habit> {
    const habits = await this.getHabits();
    const newHabit: Habit = {
      ...habit,
      id: `habit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    habits.push(newHabit);
    await this.saveHabits(habits);
    return newHabit;
  },

  async updateHabit(habitId: string, updates: Partial<Habit>): Promise<void> {
    const habits = await this.getHabits();
    const index = habits.findIndex((h) => h.id === habitId);
    if (index !== -1) {
      habits[index] = { ...habits[index], ...updates };
      await this.saveHabits(habits);
    }
  },

  async deleteHabit(habitId: string): Promise<void> {
    const habits = await this.getHabits();
    const filtered = habits.filter((h) => h.id !== habitId);
    await this.saveHabits(filtered);
    // Also remove all completion logs for this habit
    const db = await getDB();
    const allLogs = await db.getAll('logs');
    const habitLogs = allLogs.filter(
      (log) => log.moduleId === 'habit-builder' && log.note === habitId
    );
    for (const log of habitLogs) {
      await db.delete('logs', log.id);
    }
  },

  async toggleCompletion(habitId: string, date?: string): Promise<boolean> {
    const targetDate = date ?? getTodayDate();
    const db = await getDB();
    const logId = `hb-${habitId}-${targetDate}`;

    const existing = await db.get('logs', logId);

    if (existing) {
      // Toggle off
      await db.delete('logs', logId);
      return false;
    } else {
      // Toggle on
      await db.add('logs', {
        id: logId,
        date: targetDate,
        moduleId: 'habit-builder',
        status: 'completed',
        note: habitId,
      });
      return true;
    }
  },

  async isCompleted(habitId: string, date?: string): Promise<boolean> {
    const targetDate = date ?? getTodayDate();
    const db = await getDB();
    const logId = `hb-${habitId}-${targetDate}`;
    const existing = await db.get('logs', logId);
    return !!existing;
  },

  async getCompletionsForDate(date?: string): Promise<Map<string, boolean>> {
    const targetDate = date ?? getTodayDate();
    const db = await getDB();
    const allLogs = await db.getAll('logs');
    const dayLogs = allLogs.filter(
      (log) => log.date === targetDate && log.moduleId === 'habit-builder'
    );
    const completionMap = new Map<string, boolean>();
    for (const log of dayLogs) {
      if (log.note) {
        completionMap.set(log.note, true);
      }
    }
    return completionMap;
  },

  async getAllCompletions(): Promise<Map<string, Set<string>>> {
    const db = await getDB();
    const allLogs = await db.getAll('logs');
    const habitLogs = allLogs.filter((log) => log.moduleId === 'habit-builder');
    const completions = new Map<string, Set<string>>();
    for (const log of habitLogs) {
      if (log.note) {
        if (!completions.has(log.note)) {
          completions.set(log.note, new Set());
        }
        completions.get(log.note)!.add(log.date);
      }
    }
    return completions;
  },

  async calculateStreak(habitId: string): Promise<number> {
    const completions = await this.getAllCompletions();
    const habitDates = completions.get(habitId);
    if (!habitDates || habitDates.size === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;

    // Check if today is completed
    const todayStr = getTodayDate();
    // Start from today and go backwards
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      if (habitDates.has(dateStr)) {
        streak++;
      } else {
        // If today is not yet completed but we're checking today, allow it to continue
        if (i === 0 && !habitDates.has(todayStr)) {
          continue; // skip today if not completed yet
        }
        break;
      }
    }
    return streak;
  },

  async getMotivation(): Promise<string> {
    return getRandomMotivation();
  },
};