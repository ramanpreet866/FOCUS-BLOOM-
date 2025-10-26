
import type { ReactNode } from 'react';

export type TimerMode = 'focus' | 'break';

export interface User {
  name: string;
  level: number;
  xp: number;
  streak: number;
  lastSessionDate: string | null;
  totalFocusMinutes: number;
}

export interface Session {
  id: string;
  date: string;
  durationMinutes: number;
  xpGained: number;
}

export interface Achievement {
  id: string;
  name:string;
  description: string;
  icon: ReactNode;
  check: (user: User, sessions: Session[]) => boolean;
}

export interface UnlockedAchievement {
  achievementId: string;
  date: string;
}

export interface UserData {
  user: User;
  sessions: Session[];
  unlockedAchievements: UnlockedAchievement[];
}
