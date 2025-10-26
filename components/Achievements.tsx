import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ACHIEVEMENTS } from '../constants';
import { Card } from './common/Card';
import { ProgressBar } from './common/ProgressBar';

const AchievementIcon: React.FC<{ children: React.ReactNode, isUnlocked: boolean }> = ({ children, isUnlocked }) => (
    <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${isUnlocked ? 'bg-gradient-to-br from-sun-yellow to-yellow-400 shadow-lg shadow-sun-yellow/20' : 'bg-forest-light/50'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${isUnlocked ? 'text-forest-dark' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {children}
        </svg>
    </div>
);

export const Achievements: React.FC = () => {
    const { userData } = useUser();

    if (!userData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const unlockedIds = new Set(userData.unlockedAchievements.map(a => a.achievementId));
    const unlockedCount = unlockedIds.size;
    const totalCount = ACHIEVEMENTS.length;

    return (
        <div className="p-4 md:p-8 max-w-3xl mx-auto animate-fade-in-up">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-leaf-light">Achievements</h1>
                <Link to="/" className="text-sky-blue hover:underline">
                    &larr; Back to Dashboard
                </Link>
            </header>

            <Card className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold">Progress</h2>
                    <p className="font-bold">{unlockedCount} / {totalCount}</p>
                </div>
                <ProgressBar value={unlockedCount} max={totalCount} colorClass="bg-gradient-to-r from-sun-yellow to-yellow-400" />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map(achievement => {
                    const isUnlocked = unlockedIds.has(achievement.id);
                    return (
                        <Card key={achievement.id} className={`flex items-center space-x-4 transition-all duration-300 ${isUnlocked ? 'border-sun-yellow/30' : 'opacity-60'}`}>
                            <AchievementIcon isUnlocked={isUnlocked}>
                                {achievement.icon}
                            </AchievementIcon>
                            <div>
                                <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{achievement.name}</h3>
                                <p className="text-sm text-gray-400">{achievement.description}</p>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
