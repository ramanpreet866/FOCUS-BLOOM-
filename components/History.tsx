import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Card } from './common/Card';

export const History: React.FC = () => {
  const { userData } = useUser();

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const { sessions, user } = userData;
  const reversedSessions = [...sessions].reverse();

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto animate-fade-in-up">
      <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-leaf-light">Session History</h1>
          <Link to="/" className="text-sky-blue hover:underline">
              &larr; Back to Dashboard
          </Link>
      </header>

      <Card>
        <div className="mb-6">
            <h2 className="text-xl font-semibold">Summary</h2>
            <div className="grid grid-cols-2 gap-4 mt-2 text-gray-300">
                <p>Total Sessions: <span className="font-bold text-white">{sessions.length}</span></p>
                <p>Total Focus Time: <span className="font-bold text-white">{Math.floor(user.totalFocusMinutes / 60)}h {user.totalFocusMinutes % 60}m</span></p>
            </div>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {reversedSessions.length > 0 ? (
            reversedSessions.map(session => (
              <div key={session.id} className="bg-forest-light/50 p-4 rounded-lg flex justify-between items-center border-l-4 border-leaf-green">
                <div>
                  <p className="font-semibold">{new Date(session.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-400">{new Date(session.date).toLocaleTimeString()}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-bold text-leaf-green text-lg">+{session.xpGained} XP</p>
                  <p className="text-sm text-gray-400">{session.durationMinutes} minutes</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">No sessions completed yet.</p>
              <p>Your journey begins with a single step!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
