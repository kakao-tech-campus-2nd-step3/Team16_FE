import type { GroupEvent } from '@/types';

export const checkIsWithinEventRange = ({
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

import type { Event } from '@/service/Calendar/types';

export const checkIsOverlapping = (start: Date, end: Date, displayedEvents: Event[]): boolean => {
  return displayedEvents.some((event) => {
    const displayedStart = new Date(event.start);
    const displayedEnd = new Date(event.end);

    return (
      (start > displayedStart && start < displayedEnd) ||
      (end > displayedStart && end < displayedEnd) ||
      (start <= displayedStart && end >= displayedEnd)
    );
  });
};
