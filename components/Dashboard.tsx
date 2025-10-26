import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Card } from './common/Card';
import { ProgressBar } from './common/ProgressBar';
import { FocusPlant } from './FocusPlant';
import { XP_PER_LEVEL } from '../constants';

const FireIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" />
  </svg>
);

const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const HistoryIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const TrophyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M9 19H6m12 0h-3m-6 0H6" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.89 21.11A9 9 0 0121 12" />
    </svg>
);


export const Dashboard: React.FC = () => {
    const { userData } = useUser();

    if (!userData) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const { user } = userData;

    return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-fade-in-up">
            <header className="text-center space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">Welcome, <span className="text-leaf-light">{user.name}</span>!</h1>
                <p className="text-gray-400">Your garden is looking great today.</p>
            </header>

            <Card className="text-center">
                 <h2 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Your Focus Plant</h2>
                 <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-light/30 to-transparent rounded-full"></div>
                    <FocusPlant level={user.level} />
                 </div>
                 <p className="text-sm text-gray-400 mt-2">Keep focusing to help it grow!</p>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg text-white">Level {user.level}</span>
                    <span className="text-sm text-gray-400">{user.xp} / {XP_PER_LEVEL} XP</span>
                </div>
                <ProgressBar value={user.xp} max={XP_PER_LEVEL} />
            </Card>

            <div className="grid grid-cols-2 gap-6">
                <Card className="flex flex-col items-center justify-center text-center">
                    <FireIcon className="text-sun-yellow w-10 h-10 mb-2" />
                    <p className="text-3xl font-bold">{user.streak}</p>
                    <p className="text-gray-400 text-sm">Day Streak</p>
                </Card>
                <Card className="flex flex-col items-center justify-center text-center">
                    <ClockIcon className="text-sky-blue w-10 h-10 mb-2" />
                    <div>
                        <p className="text-3xl font-bold">{Math.floor(user.totalFocusMinutes / 60)}<span className="text-lg">h</span> {user.totalFocusMinutes % 60}<span className="text-lg">m</span></p>
                        <p className="text-gray-400 text-sm">Total Focus</p>
                    </div>
                </Card>
            </div>
            
            <div className="sticky bottom-4 z-10">
              <Link to="/timer" className="w-full block text-center bg-leaf-green hover:bg-leaf-light text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-leaf-green/20 transform hover:scale-105 animate-pulse-subtle">
                  Start New Focus Session
              </Link>
            </div>
            
            <nav className="grid grid-cols-2 gap-4">
                 <Link to="/history" className="flex items-center justify-center space-x-2 text-center bg-forest-dark/50 hover:bg-forest-light/50 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                    <HistoryIcon />
                    <span>View History</span>
                </Link>
                <Link to="/achievements" className="flex items-center justify-center space-x-2 text-center bg-forest-dark/50 hover:bg-forest-light/50 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                    <TrophyIcon />
                    <span>Achievements</span>
                </Link>
            </nav>
        </div>
    );
};
