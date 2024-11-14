import type { PersonalEvent } from '@/types';

export const mergeTimes = (times: PersonalEvent[]): PersonalEvent[] => {
  if (times.length === 0) return [];
  const sortedTimes = [...times].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  );
  const mergedTimes: PersonalEvent[] = [];
  let current = sortedTimes[0];

  for (let i = 1; i < sortedTimes.length; i++) {
    const next = sortedTimes[i];
    const currentEnd = new Date(current.end_at).getTime();
    const nextStart = new Date(next.start_at).getTime();

    if (nextStart <= currentEnd) {
      current.end_at = new Date(Math.max(currentEnd, new Date(next.end_at).getTime()))
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
