import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Timer } from './components/Timer';
import { History } from './components/History';
import { Achievements } from './components/Achievements';

const AppContent: React.FC = () => {
    const { userData, loadUser, isLoading } = useUser();
    const [currentUsername, setCurrentUsername] = useState<string | null>(() => localStorage.getItem('focus_bloom_current_user'));

    useEffect(() => {
        if (currentUsername) {
            loadUser(currentUsername);
        }
    }, [currentUsername, loadUser]);

    const handleLogin = (name: string) => {
        localStorage.setItem('focus_bloom_current_user', name);
        setCurrentUsername(name);
    };

    if (isLoading && currentUsername) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!userData || !currentUsername) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/history" element={<History />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </UserProvider>
  );
};

export default App;
