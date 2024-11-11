import type { CalendarEvent, GroupEvent } from '@/types';

export const defaultEventToGroupEvent = (events: CalendarEvent[]): GroupEvent[] =>
  events.map(({ start, end }) => ({
    start,
    end,
    backgroundColor: 'rgba(105, 132, 116, 0.7)',
    borderColor: '698474',
    display: 'background',
  }));

export const isWithinEventRange = ({
  clickedTime,
  duration,
  events,
}: {
  clickedTime: Date;
  duration: number;
  events: GroupEvent[];
}): { isValid: boolean; event?: GroupEvent } => {
  const clickedTimeEnd = new Date(clickedTime.getTime() + 1000 * 60 * 60 * duration);

  for (const event of events) {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    if (clickedTime >= eventStart && clickedTimeEnd <= eventEnd) {
      return { isValid: true, event };
    }
  }

  return { isValid: false };
};
