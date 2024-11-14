import { createContext, useContext, useEffect, useState } from 'react';

import type { PersonalEvent } from '@/types';

interface MeetingData {
  times: PersonalEvent[];
  preferences: number[];
  nonPreferences: number[];
}

interface JoinFormContextType {
  meetingData: MeetingData;
  setTimes: (times: PersonalEvent[]) => void;
  setPreferences: (preferences: number[]) => void;
  setNonPreferences: (nonPreferences: number[]) => void;
}

const JoinFormContext = createContext<JoinFormContextType | null>(null);

export const JoinFormProvider: React.FC<{
  children: React.ReactNode;
  initialData?: MeetingData;
}> = ({ children, initialData }) => {
  const [meetingData, setData] = useState<MeetingData>(
    initialData || { times: [], preferences: [], nonPreferences: [] },
  );

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const setTimes = (times: PersonalEvent[]) => {
    setData((prevData) => ({
      ...prevData,
      times,
    }));
  };

  const setPreferences = (preferences: number[]) => {
    setData((prevData) => ({
      ...prevData,
      preferences,
    }));
  };

  const setNonPreferences = (nonPreferences: number[]) => {
    setData((prevData) => ({
      ...prevData,
      nonPreferences,
    }));
  };

  return (
    <JoinFormContext.Provider
      value={{
        meetingData,
        setTimes,
        setPreferences,
        setNonPreferences,
      }}
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
