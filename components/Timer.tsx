import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../hooks/useTimer';
import { useUser } from '../context/UserContext';
import { getMotivationalQuote } from '../services/geminiService';
import { DEFAULT_FOCUS_MINUTES, DEFAULT_BREAK_MINUTES } from '../constants';
import type { Achievement, TimerMode } from '../types';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const TimerRing: React.FC<{ progress: number; mode: TimerMode }> = ({ progress, mode }) => {
    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress * circumference;
    const strokeColor = mode === 'focus' ? 'stroke-sky-blue' : 'stroke-leaf-green';

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
            <circle
                className="stroke-current text-forest-light/50"
                strokeWidth="10"
                cx="150"
                cy="150"
                r={radius}
                fill="transparent"
            />
            <circle
                className={`transform -rotate-90 origin-center transition-all duration-500 ${strokeColor}`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                cx="150"
                cy="150"
                r={radius}
                fill="transparent"
            />
        </svg>
    );
};


export const Timer: React.FC = () => {
    const { completeSession } = useUser();
    const navigate = useNavigate();
    const [motivationalQuote, setMotivationalQuote] = useState('');
    const [sessionResult, setSessionResult] = useState<{ xpGained: number; leveledUp: boolean; newAchievements: Achievement[] } | null>(null);

    const handleSessionComplete = (mode: TimerMode) => {
        if (mode === 'focus') {
            const result = completeSession(DEFAULT_FOCUS_MINUTES);
            setSessionResult(result);
        }
    };
    
    const { timeRemaining, mode, isActive, start, pause, skip } = useTimer({
        focusMinutes: DEFAULT_FOCUS_MINUTES,
        breakMinutes: DEFAULT_BREAK_MINUTES,
        onSessionComplete: handleSessionComplete,
    });
    
    useEffect(() => {
        if (isActive && mode === 'focus' && !motivationalQuote) {
            getMotivationalQuote().then(setMotivationalQuote);
        }
        if (!isActive) {
            setMotivationalQuote('');
        }
    }, [isActive, mode]);

    const handleCloseModal = () => {
        setSessionResult(null);
    }
    
    const totalDuration = mode === 'focus' ? DEFAULT_FOCUS_MINUTES * 60 : DEFAULT_BREAK_MINUTES * 60;
    const progress = timeRemaining / totalDuration;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white transition-colors duration-500">
             {sessionResult && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-forest-night border border-forest-light/20 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-sun-yellow mb-2">Session Complete!</h2>
                        <p className="text-5xl font-bold text-leaf-green my-4">+{sessionResult.xpGained} XP</p>
                        {sessionResult.leveledUp && <p className="text-lg text-sky-blue animate-pulse font-semibold">LEVEL UP!</p>}
                        {sessionResult.newAchievements.length > 0 && (
                            <div className="mt-4 space-y-1">
                                <h3 className="font-semibold text-glow-green">Achievements Unlocked!</h3>
                                {sessionResult.newAchievements.map(a => <p key={a.id} className="text-sm text-gray-300">{a.name}</p>)}
                            </div>
                        )}
                        <button onClick={handleCloseModal} className="mt-6 bg-leaf-green hover:bg-leaf-light text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300 transform hover:scale-105">
                            Awesome!
                        </button>
                    </div>
                </div>
            )}
            
            <div className={`relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center`}>
                <TimerRing progress={progress} mode={mode} />
                <div className="z-10 text-center">
                    <p className="text-lg font-semibold uppercase tracking-wider text-gray-400">{mode}</p>
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-100">{formatTime(timeRemaining)}</h1>
                </div>
            </div>

            <div className="mt-8 text-center h-12 flex items-center justify-center">
                {isActive && motivationalQuote ? (
                    <p className="italic text-gray-400 animate-fade-in-up">"{motivationalQuote}"</p>
                ) : !isActive && (
                    <p className="text-gray-400">
                        {mode === 'focus' ? "Time to focus and shine." : "Relax and recharge."}
                    </p>
                )}
            </div>
            
            <div className="flex items-center space-x-6 mt-4">
                 <button onClick={() => navigate('/')} title="End Session" className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </button>
                
                {!isActive ? (
                     <button onClick={start} title="Start Timer" className="bg-white text-forest-dark font-bold p-6 rounded-full shadow-lg hover:scale-105 transform transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.002v3.996a1 1 0 001.555.832l3.197-2.001a1 1 0 000-1.664l-3.197-1.999z" clipRule="evenodd" /></svg>
                    </button>
                ) : (
                    <button onClick={pause} title="Pause Timer" className="bg-white text-forest-dark font-bold p-6 rounded-full shadow-lg hover:scale-105 transform transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    </button>
                )}

                <button onClick={skip} title="Skip Phase" className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
};
