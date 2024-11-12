import type { SelectedTime } from '@/types';

import { mergeEndTimes, sortTimes } from '../calculator';

describe('calculator', () => {
  describe('sortTimes', () => {
    it('시작 시간을 기준으로 오름차순으로 정렬한다.', () => {
      const times = [
        {
          startAt: '2023-12-02T10:00:00',
          endAt: '2023-12-02T11:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
        {
          startAt: '2023-12-02T09:00:00',
          endAt: '2023-12-02T10:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
        {
          startAt: '2023-12-02T11:00:00',
          endAt: '2023-12-02T12:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
      ];

      const result = sortTimes(times);

      expect(result).toEqual([
        {
          allDay: false,
          endAt: '2023-12-02T10:00:00',
          startAt: '2023-12-02T09:00:00',
          timeZone: 'Asia/Seoul',
        },
        {
          allDay: false,
          endAt: '2023-12-02T11:00:00',
          startAt: '2023-12-02T10:00:00',
          timeZone: 'Asia/Seoul',
        },
        {
          allDay: false,
          endAt: '2023-12-02T12:00:00',
          startAt: '2023-12-02T11:00:00',
          timeZone: 'Asia/Seoul',
        },
      ]);
    });

    it('빈배열을 전달받으면 빈 배열을 반환한다.', () => {
      const times: SelectedTime[] = [];
      const result = sortTimes(times);
      expect(result).toEqual([]);
    });

    it('원본 배열을 수정하지 않는다.', () => {
      const times = [
        {
          startAt: '2023-12-02T10:00:00',
          endAt: '2023-12-02T11:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
        {
          startAt: '2023-12-02T09:00:00',
          endAt: '2023-12-02T10:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
        {
          startAt: '2023-12-02T11:00:00',
          endAt: '2023-12-02T12:00:00',
          allDay: false,
          timeZone: 'Asia/Seoul',
        },
      ];
      const original = [...times];

      sortTimes(times);

      expect(times).toEqual(original);
    });

    describe('mergeEndTimes', () => {
      it('현재 종료 시간과 다음 종료 시간 중 더 늦은 시간을 반환한다', () => {
        const currentEnd = new Date('2023-12-02T11:00:00').getTime();
        const nextEndAt = '2023-12-02T12:00:00';

        const result = mergeEndTimes(currentEnd, nextEndAt);

        expect(result).toBe('2023-12-02T12:00:00');
      });

      it('현재 종료 시간이 더 늦은 경우 현재 종료 시간을 반환한다', () => {
        const currentEnd = new Date('2023-12-02T13:00:00').getTime();
        const nextEndAt = '2023-12-02T12:00:00';

        const result = mergeEndTimes(currentEnd, nextEndAt);

        expect(result).toBe('2023-12-02T13:00:00');
      });

      it('동일한 시간이 입력되면 해당 시간을 반환한다', () => {
        const currentEnd = new Date('2023-12-02T12:00:00').getTime();
        const nextEndAt = '2023-12-02T12:00:00';

        const result = mergeEndTimes(currentEnd, nextEndAt);

        expect(result).toBe('2023-12-02T12:00:00');
      });
    });
  });
});
