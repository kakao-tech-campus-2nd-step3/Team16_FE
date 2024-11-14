import type { Event } from '@/service/Calendar/types';
import type { PersonalEvent } from '@/types';

export const convertSelectedTimesToEvents = (selectedTimes: PersonalEvent[]): Event[] => {
  return selectedTimes.map((time, index) => ({
    id: index.toString(),
    title: '',
    date: time.start_at,
    start: time.start_at,
    end: time.end_at,
    allDay: time.all_day,
  }));
};
