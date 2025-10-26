
import { useState, useEffect, useCallback } from 'react';
import type { User, Session, UnlockedAchievement, UserData, Achievement } from '../types';
import { XP_PER_LEVEL, XP_PER_SESSION, XP_STREAK_BONUS, ACHIEVEMENTS } from '../constants';

const isSameDay = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};

const isYesterday = (date1: Date, date2: Date) => {
    const yesterday = new Date(date1);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(yesterday, date2);
};


export const useUserData = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUser = useCallback((name: string) => {
        setIsLoading(true);
        try {
            const savedData = localStorage.getItem(`focus_bloom_user_${name}`);
            if (savedData) {
                setUserData(JSON.parse(savedData));
            } else {
                const newUser: User = {
                    name,
                    level: 1,
                    xp: 0,
                    streak: 0,
                    lastSessionDate: null,
                    totalFocusMinutes: 0,
                };
                setUserData({
                    user: newUser,
                    sessions: [],
                    unlockedAchievements: [],
                });
            }
        } catch (error) {
            console.error("Failed to load user data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUserData(null);
    }, []);

    useEffect(() => {
        if (userData) {
            try {
                localStorage.setItem(`focus_bloom_user_${userData.user.name}`, JSON.stringify(userData));
            } catch (error) {
                console.error("Failed to save user data:", error);
            }
        }
    }, [userData]);

    const completeSession = useCallback((durationMinutes: number): { xpGained: number, leveledUp: boolean, newAchievements: Achievement[] } => {
        if (!userData) return { xpGained: 0, leveledUp: false, newAchievements: [] };

        let currentUser = { ...userData.user };
        let xpGained = Math.round((durationMinutes / 25) * XP_PER_SESSION);

        // --- Streak Logic ---
        const now = new Date();
        const lastSessionDate = currentUser.lastSessionDate ? new Date(currentUser.lastSessionDate) : null;

        if (lastSessionDate) {
            if (!isSameDay(now, lastSessionDate)) {
                if (isYesterday(now, lastSessionDate)) {
                    currentUser.streak += 1;
                    xpGained += XP_STREAK_BONUS;
                } else {
                    currentUser.streak = 1;
                }
            }
        } else {
            currentUser.streak = 1;
        }
        currentUser.lastSessionDate = now.toISOString();

        // --- XP & Level Logic ---
        currentUser.xp += xpGained;
        let leveledUp = false;
        while (currentUser.xp >= XP_PER_LEVEL) {
            currentUser.xp -= XP_PER_LEVEL;
            currentUser.level += 1;
            leveledUp = true;
        }
        
        currentUser.totalFocusMinutes += durationMinutes;

        // --- Session History ---
        const newSession: Session = {
            id: new Date().toISOString(),
            date: new Date().toISOString(),
            durationMinutes,
            xpGained,
        };
        const newSessions = [...userData.sessions, newSession];

        // --- Achievement Logic ---
        const newAchievements: Achievement[] = [];
        const currentUnlockedIds = new Set(userData.unlockedAchievements.map(a => a.achievementId));
        
        const newlyUnlocked: UnlockedAchievement[] = [];
        ACHIEVEMENTS.forEach(achievement => {
            if (!currentUnlockedIds.has(achievement.id) && achievement.check(currentUser, newSessions)) {
                newAchievements.push(achievement);
                newlyUnlocked.push({
                    achievementId: achievement.id,
                    date: new Date().toISOString(),
                });
            }
        });
        
        setUserData({
            user: currentUser,
            sessions: newSessions,
            unlockedAchievements: [...userData.unlockedAchievements, ...newlyUnlocked],
        });

        return { xpGained, leveledUp, newAchievements };
    }, [userData]);

    return {
        userData,
        isLoading,
        loadUser,
        logout,
        completeSession,
    };
};
