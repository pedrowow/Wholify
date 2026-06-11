import React from 'react';

export type ModuleCategory = 'body' | 'mind' | 'soul';

export interface ModuleConfig {
  id: string;
  name: string;
  icon: string; // SVG path or emoji
  route: string;
  description: string;
  category: ModuleCategory;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  hasNotifications: boolean;
  defaultSnoozeMinutes: number;
  defaultReminderTimes: string[]; // e.g. ["09:00", "14:00", "19:00"]
  enableExport: boolean;
}

const Placeholder = React.lazy(() => import('../pages/PlaceholderModule'));

export const modules: ModuleConfig[] = [
  {
    id: 'habit-builder',
    name: 'Habit Builder',
    icon: '🏗️',
    route: '/habits',
    description: 'Build lasting daily habits for your body.',
    category: 'body',
    component: Placeholder,
    hasNotifications: true,
    defaultSnoozeMinutes: 15,
    defaultReminderTimes: ['08:00', '12:00', '18:00'],
    enableExport: true,
  },
  {
    id: 'violin-ear-trainer',
    name: 'Violin Ear Trainer',
    icon: '🎻',
    route: '/violin',
    description: 'Sharpen your musical ear for violin practice.',
    category: 'mind',
    component: Placeholder,
    hasNotifications: true,
    defaultSnoozeMinutes: 30,
    defaultReminderTimes: ['10:00', '16:00'],
    enableExport: false,
  },
  {
    id: 'tarot-learning',
    name: 'Tarot Learning',
    icon: '🃏',
    route: '/tarot',
    description: 'Learn the archetypes and meanings of Tarot cards.',
    category: 'soul',
    component: Placeholder,
    hasNotifications: true,
    defaultSnoozeMinutes: 60,
    defaultReminderTimes: ['09:00'],
    enableExport: true,
  },
  {
    id: 'witchcraft',
    name: 'Witchcraft',
    icon: '🧹',
    route: '/witchcraft',
    description: 'Explore the history and practice of modern witchcraft.',
    category: 'soul',
    component: Placeholder,
    hasNotifications: false,
    defaultSnoozeMinutes: 60,
    defaultReminderTimes: [],
    enableExport: true,
  },
  {
    id: 'greek-mythology',
    name: 'Greek Mythology',
    icon: '🏺',
    route: '/greek-mythology',
    description: 'Study the myths and legends of ancient Greece.',
    category: 'mind',
    component: Placeholder,
    hasNotifications: false,
    defaultSnoozeMinutes: 60,
    defaultReminderTimes: [],
    enableExport: true,
  },
  {
    id: 'art-history',
    name: 'Art History',
    icon: '🎨',
    route: '/art-history',
    description: 'A daily deep dive into the history of art.',
    category: 'mind',
    component: Placeholder,
    hasNotifications: false,
    defaultSnoozeMinutes: 60,
    defaultReminderTimes: [],
    enableExport: true,
  },
  {
    id: 'people-to-contact',
    name: 'People to Contact',
    icon: '📱',
    route: '/contacts',
    description: 'Maintain your social connections and soul bonds.',
    category: 'soul',
    component: Placeholder,
    hasNotifications: true,
    defaultSnoozeMinutes: 120,
    defaultReminderTimes: ['19:00'],
    enableExport: false,
  },
  {
    id: 'home-workouts',
    name: 'Home Workouts',
    icon: '🏠',
    route: '/workouts',
    description: 'Simple and effective bodyweight exercises at home.',
    category: 'body',
    component: Placeholder,
    hasNotifications: true,
    defaultSnoozeMinutes: 30,
    defaultReminderTimes: ['07:30', '17:30'],
    enableExport: true,
  },
  {
    id: 'other-links',
    name: 'Other Links',
    icon: '🔗',
    route: '/links',
    description: 'Curated resources for your body growth.',
    category: 'body',
    component: Placeholder,
    hasNotifications: false,
    defaultSnoozeMinutes: 60,
    defaultReminderTimes: [],
    enableExport: false,
  },
];
