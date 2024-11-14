import type { PersonalEvent, PersonalResponse } from '@/types';

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
