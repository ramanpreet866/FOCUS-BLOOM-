
import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useUserData } from '../hooks/useUserData';
import type { Achievement } from '../types';

type UserContextType = ReturnType<typeof useUserData> | null;

const UserContext = createContext<UserContextType>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
