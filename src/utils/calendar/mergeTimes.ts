import type { SelectedTime } from '@/types';

export const mergeTimes = (times: SelectedTime[]): SelectedTime[] => {
  if (times.length === 0) return [];
  const sortedTimes = [...times].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  );
  const mergedTimes: SelectedTime[] = [];
  let current = sortedTimes[0];

  for (let i = 1; i < sortedTimes.length; i++) {
    const next = sortedTimes[i];
    const currentEnd = new Date(current.endAt).getTime();
    const nextStart = new Date(next.startAt).getTime();

    if (nextStart <= currentEnd) {
      current.endAt = new Date(Math.max(currentEnd, new Date(next.endAt).getTime()))
        .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
        .replace(' ', 'T');
    } else {
      mergedTimes.push(current);
      current = next;
    }
  }

  mergedTimes.push(current);

  return mergedTimes;
};
