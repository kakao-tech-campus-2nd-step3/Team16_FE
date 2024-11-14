import type { PersonalResponse, SelectedTime } from '@/types';

export const convertToInitialTimes = (data: PersonalResponse): SelectedTime[] => {
  return data.meeting_personal_times.flatMap((event) => {
    const startTime = new Date(event.start_at).getTime();
    const endTime = new Date(event.end_at).getTime();
    const timeSlots: SelectedTime[] = [];

    for (let time = startTime; time < endTime; time += 30 * 60 * 1000) {
      const slot: SelectedTime = {
        startAt: new Date(time)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        endAt: new Date(time + 30 * 60 * 1000)
          .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
          .replace(' ', 'T'),
        timeZone: event.time_zone,
        allDay: event.all_day,
      };
      timeSlots.push(slot);
    }

    return timeSlots;
  });
};
