import { createContext, useContext, useState } from 'react';

import type { SelectedTime } from '@/types';

interface JoinFormContextType {
  times: SelectedTime[];
  preferences: number[];
  nonPreferences: number[];
  setTimes: React.Dispatch<React.SetStateAction<SelectedTime[]>>;
  setPreferences: React.Dispatch<React.SetStateAction<number[]>>;
  setNonPreferences: React.Dispatch<React.SetStateAction<number[]>>;
}

const JoinFormContext = createContext<JoinFormContextType | null>(null);

export const JoinFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [times, setTimes] = useState<SelectedTime[]>([]);
  const [preferences, setPreferences] = useState<number[]>([]);
  const [nonPreferences, setNonPreferences] = useState<number[]>([]);

  return (
    <JoinFormContext.Provider
      value={{ times, setTimes, preferences, setPreferences, nonPreferences, setNonPreferences }}
    >
      {children}
    </JoinFormContext.Provider>
  );
};

export const useJoinFormContext = () => {
  const context = useContext(JoinFormContext);
  if (!context) {
    throw new Error('useJoinFormContext must be used within a JoinFormProvider');
  }
  return context;
};
