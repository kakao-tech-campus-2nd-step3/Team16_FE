import type { Event } from '@/service/Calendar/types';

export const isOverlapping = (start: Date, end: Date, displayedEvents: Event[]): boolean => {
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
