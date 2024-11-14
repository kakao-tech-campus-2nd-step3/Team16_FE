import type { Event } from '@/service/Calendar/types';

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

    const localStartTime = `${timeStart.getFullYear()}-${String(timeStart.getMonth() + 1).padStart(2, '0')}-${String(timeStart.getDate()).padStart(2, '0')}T${String(timeStart.getHours()).padStart(2, '0')}:${String(timeStart.getMinutes()).padStart(2, '0')}:00`;
    const localEndTime = `${timeEnd.getFullYear()}-${String(timeEnd.getMonth() + 1).padStart(2, '0')}-${String(timeEnd.getDate()).padStart(2, '0')}T${String(timeEnd.getHours()).padStart(2, '0')}:${String(timeEnd.getMinutes()).padStart(2, '0')}:00`;

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
