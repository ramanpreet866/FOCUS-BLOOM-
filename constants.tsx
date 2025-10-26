
import React from 'react';
import type { Achievement } from './types';

export const XP_PER_SESSION = 50; // For a standard 25-min session
export const XP_PER_LEVEL = 500;
export const XP_STREAK_BONUS = 20;

export const DEFAULT_FOCUS_MINUTES = 25;
export const DEFAULT_BREAK_MINUTES = 5;

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Complete your first focus session.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />,
    check: (_, sessions) => sessions.length >= 1,
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete a session before 8 AM.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />,
    check: (_, sessions) => sessions.some(s => new Date(s.date).getHours() < 8),
  },
  {
    id: 'three_day_streak',
    name: 'On a Roll',
    description: 'Maintain a 3-day study streak.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />,
    check: (user) => user.streak >= 3,
  },
  {
    id: 'marathon_focus',
    name: 'Marathon Runner',
    description: 'Study for over 2 hours in a single day.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
    check: (_, sessions) => {
      const dailyTotals = sessions.reduce((acc, session) => {
        const day = new Date(session.date).toDateString();
        acc[day] = (acc[day] || 0) + session.durationMinutes;
        return acc;
      }, {} as Record<string, number>);
      return Object.values(dailyTotals).some(total => total >= 120);
    },
  },
  {
    id: 'level_5',
    name: 'Level 5 Scholar',
    description: 'Reach Level 5.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />,
    check: (user) => user.level >= 5,
  },
];
