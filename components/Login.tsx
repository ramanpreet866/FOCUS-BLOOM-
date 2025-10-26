import React, { useState } from 'react';
import { Card } from './common/Card';
import { FocusPlant } from './FocusPlant';

interface LoginProps {
  onLogin: (name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in-up">
      <Card className="max-w-md w-full text-center">
        <div className="mx-auto w-32 h-32 mb-4">
          <FocusPlant level={15} /> 
        </div>
        <h1 className="text-4xl font-bold text-leaf-light mb-2">Focus Bloom</h1>
        <p className="text-gray-400 mb-8">Turn your focus into a flourishing garden.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="w-full bg-forest-light/50 text-white placeholder-gray-400 p-3 rounded-lg border-2 border-transparent focus:outline-none focus:border-leaf-green focus:ring-1 focus:ring-leaf-green transition-all"
            aria-label="Enter your name"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-leaf-green hover:bg-leaf-light text-white font-bold py-3 px-4 rounded-lg mt-4 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            Start Growing
          </button>
        </form>
      </Card>
    </div>
  );
};
