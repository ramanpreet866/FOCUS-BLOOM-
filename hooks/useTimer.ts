
import { useState, useEffect, useRef, useCallback } from 'react';
import type { TimerMode } from '../types';

interface UseTimerProps {
    focusMinutes: number;
    breakMinutes: number;
    onSessionComplete: (mode: TimerMode) => void;
}

export const useTimer = ({ focusMinutes, breakMinutes, onSessionComplete }: UseTimerProps) => {
    const [mode, setMode] = useState<TimerMode>('focus');
    const [isActive, setIsActive] = useState(false);
    
    const initialTime = mode === 'focus' ? focusMinutes * 60 : breakMinutes * 60;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        setTimeRemaining(mode === 'focus' ? focusMinutes * 60 : breakMinutes * 60);
    }, [focusMinutes, breakMinutes, mode]);

    const stopTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else {
            stopTimer();
        }
        return () => stopTimer();
    }, [isActive, stopTimer]);

    useEffect(() => {
        if (timeRemaining <= 0) {
            stopTimer();
            setIsActive(false);
            onSessionComplete(mode);
            setMode(prevMode => (prevMode === 'focus' ? 'break' : 'focus'));
        }
    }, [timeRemaining, onSessionComplete, stopTimer, mode]);

    const start = () => setIsActive(true);
    const pause = () => setIsActive(false);
    const reset = () => {
        setIsActive(false);
        setTimeRemaining(initialTime);
    };
    
    const skip = () => {
        stopTimer();
        setIsActive(false);
        setMode(prevMode => (prevMode === 'focus' ? 'break' : 'focus'));
    };

    return { timeRemaining, mode, isActive, start, pause, reset, skip };
};
