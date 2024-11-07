import { createContext, useContext, useState } from 'react';

import type { SelectedTime } from '@/types';

interface MeetingData {
  times: SelectedTime[];
  preferences: number[];
  nonPreferences: number[];
}

interface JoinFormContextType {
  meetingData: { [meetingId: string]: MeetingData };
  setTimes: (meetingId: string, times: SelectedTime[]) => void;
  setPreferences: (meetingId: string, preferences: number[]) => void;
  setNonPreferences: (meetingId: string, nonPreferences: number[]) => void;
}

const JoinFormContext = createContext<JoinFormContextType | null>(null);

export const JoinFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetingData, setData] = useState<{ [meetingId: string]: MeetingData }>({});

  const setTimes = (meetingId: string, times: SelectedTime[]) => {
    setData((prevData) => ({
      ...prevData,
      [meetingId]: {
        ...prevData[meetingId],
        times,
      },
    }));
  };

  const setPreferences = (meetingId: string, preferences: number[]) => {
    setData((prevData) => ({
      ...prevData,
      [meetingId]: {
        ...prevData[meetingId],
        preferences,
      },
    }));
  };

  const setNonPreferences = (meetingId: string, nonPreferences: number[]) => {
    setData((prevData) => ({
      ...prevData,
      [meetingId]: {
        ...prevData[meetingId],
        nonPreferences,
      },
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
