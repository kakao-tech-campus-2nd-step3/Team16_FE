import type { Event } from '@/service/Calendar/types';
import type { PersonalEvent } from '@/types';

import { formatToLocalTime } from './formatter';

export const toggleSelectedEvent = (
  start: string,
  end: string,
  selectedEvents: Event[],
): Event[] => {
  const updatedEvents = [...selectedEvents];
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();

  for (let time = startTimestamp; time < endTimestamp; time += 30 * 60 * 1000) {
    const timeStart = new Date(time);
    const timeEnd = new Date(time + 30 * 60 * 1000);

    const localStartTime = formatToLocalTime(timeStart);
    const localEndTime = formatToLocalTime(timeEnd);

    const existingIndex = updatedEvents.findIndex(
      (event) => event.start === localStartTime && event.end === localEndTime,
    );

    if (existingIndex !== -1) {
      updatedEvents.splice(existingIndex, 1);
    } else {
      updatedEvents.push({
        id: `selected-${localStartTime}`,
        title: '',
        date: localStartTime,
        start: localStartTime,
        end: localEndTime,
        allDay: false,
      });
    }
  }

  return updatedEvents;
};

export const sortTimes = (times: PersonalEvent[]) =>
  [...times].sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

export const mergeEndTimes = (currentEnd: number, nextEndAt: string): string => {
  return new Date(Math.max(currentEnd, new Date(nextEndAt).getTime()))
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .replace(' ', 'T');
};

export const mergeTimes = (times: PersonalEvent[]): PersonalEvent[] => {
  if (times.length === 0) return [];
  const sortedTimes = sortTimes(times);
  const mergedTimes: PersonalEvent[] = [];
  let current = sortedTimes[0];

  for (let i = 1; i < sortedTimes.length; i++) {
    const next = sortedTimes[i];
    const currentEnd = new Date(current.end_at).getTime();
    const nextStart = new Date(next.start_at).getTime();

    if (nextStart <= currentEnd) {
      current.end_at = mergeEndTimes(currentEnd, next.end_at);
    } else {
      mergedTimes.push(current);
      current = next;
    }
  }

  mergedTimes.push(current);

  return mergedTimes;
};
