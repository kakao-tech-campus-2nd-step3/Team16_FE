import type { Event } from '@/service/Calendar/types';
import { colors } from '@/styles/variants';

export const toggleSelectedEvent = (
  start: string,
  end: string,
  selectedEvents: Event[],
): Event[] => {
  const updatedEvents = [...selectedEvents];
  const startTimestamp = new Date(start).getTime();
  const endTimestamp = new Date(end).getTime();

  for (let time = startTimestamp; time < endTimestamp; time += 30 * 60 * 1000) {
    const timeStart = new Date(time).toISOString();
    const timeEnd = new Date(time + 30 * 60 * 1000).toISOString();

    const existingIndex = updatedEvents.findIndex(
      (event) => event.start === timeStart && event.end === timeEnd,
    );

    if (existingIndex !== -1) {
      updatedEvents.splice(existingIndex, 1);
    } else {
      updatedEvents.push({
        id: `selected-${timeStart}`,
        title: '',
        date: timeStart,
        start: timeStart,
        end: timeEnd,
        backgroundColor: colors.primary_half,
        borderColor: colors.primary_half,
        allDay: false,
      });
    }
  }

  return updatedEvents;
};
