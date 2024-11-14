import type { Event } from '@/service/Calendar/types';
import type { CalendarEvent, GroupEvent, PersonalEvent, PersonalResponse } from '@/types';

export const convertToInitialTimes = (data: PersonalResponse): PersonalEvent[] => {
  return data.meeting_personal_times.flatMap((event) => {
    const startTime = new Date(event.start_at).getTime();
    const endTime = new Date(event.end_at).getTime();
    const timeSlots: PersonalEvent[] = [];

    for (let time = startTime; time < endTime; time += 30 * 60 * 1000) {
      const slot: PersonalEvent = {
        start_at: new Date(time)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        end_at: new Date(time + 30 * 60 * 1000)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        time_zone: event.time_zone,
        all_day: event.all_day,
      };
      timeSlots.push(slot);
    }

    return timeSlots;
  });
};

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

export const defaultEventToGroupEvent = (events: CalendarEvent[]): GroupEvent[] =>
  events.map(({ start, end }) => ({
    start,
    end,
    backgroundColor: 'rgba(105, 132, 116, 0.7)',
    borderColor: '698474',
    display: 'background',
  }));
