import type { Event } from '@/service/Calendar/types';
import type { SelectedTime } from '@/types';

export const convertSelectedTimesToEvents = (selectedTimes: SelectedTime[]): Event[] => {
  return selectedTimes.map((time, index) => ({
    id: index.toString(),
    title: '',
    date: time.startAt,
    start: time.startAt,
    end: time.endAt,
    allDay: time.allDay,
  }));
};
