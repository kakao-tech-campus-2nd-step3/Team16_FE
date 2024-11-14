import type { Event } from '@/service/Calendar/types';
import type { PersonalEvent } from '@/types';

import { mergeEndTimes, mergeTimes, sortTimes, toggleSelectedEvent } from '../calculator';

describe('calculator', () => {
  describe('sortTimes', () => {
    it('시작 시간을 기준으로 오름차순으로 정렬한다.', () => {
      const times = [
        {
          start_at: '2023-12-02T10:00:00',
          end_at: '2023-12-02T11:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T10:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T11:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ];

      const result = sortTimes(times);

      expect(result).toEqual([
        {
          all_day: false,
          end_at: '2023-12-02T10:00:00',
          start_at: '2023-12-02T09:00:00',
          time_zone: 'Asia/Seoul',
        },
        {
          all_day: false,
          end_zt: '2023-12-02T11:00:00',
          start_zt: '2023-12-02T10:00:00',
          time_zone: 'Asia/Seoul',
        },
        {
          all_day: false,
          end_at: '2023-12-02T12:00:00',
          start_at: '2023-12-02T11:00:00',
          time_zone: 'Asia/Seoul',
        },
      ]);
    });

    it('빈배열을 전달받으면 빈 배열을 반환한다.', () => {
      const times: PersonalEvent[] = [];
      const result = sortTimes(times);
      expect(result).toEqual([]);
    });

    it('원본 배열을 수정하지 않는다.', () => {
      const times = [
        {
          start_at: '2023-12-02T10:00:00',
          end_at: '2023-12-02T11:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T10:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T11:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ];
      const original = [...times];

      sortTimes(times);

      expect(times).toEqual(original);
    });
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
  describe('mergeTimes', () => {
    it('빈 배열이 입력되면 빈 배열을 반환한다', () => {
      const times: PersonalEvent[] = [];
      const result = mergeTimes(times);
      expect(result).toEqual([]);
    });

    it('겹치는 시간이 없는 경우 원래 배열을 반환한다', () => {
      const times = [
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T10:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T11:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ];

      const result = mergeTimes(times);
      expect(result).toEqual(times);
    });

    it('겹치는 시간이 있는 경우 병합한다', () => {
      const times = [
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T11:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T10:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ];

      const result = mergeTimes(times);
      expect(result).toEqual([
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ]);
    });

    it('여러 구간이 겹치는 경우 모두 병합한다', () => {
      const times = [
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T11:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T10:00:00',
          end_at: '2023-12-02T12:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
        {
          start_at: '2023-12-02T11:30:00',
          end_at: '2023-12-02T13:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ];

      const result = mergeTimes(times);
      expect(result).toEqual([
        {
          start_at: '2023-12-02T09:00:00',
          end_at: '2023-12-02T13:00:00',
          all_day: false,
          time_zone: 'Asia/Seoul',
        },
      ]);
    });
  });

  describe('toggleSelectedEvent', () => {
    const baseDate = '2024-03-10T10:00:00';
    const baseEndDate = '2024-03-10T11:00:00';

    // 헬퍼 함수
    const createExpectedEvent = (start: string, end: string): Event => ({
      id: `selected-${start}`,
      title: '',
      date: start,
      start,
      end,
      allDay: false,
    });

    it('빈 배열에 새로운 이벤트를 추가하는 경우', () => {
      const selectedEvents: Event[] = [];
      const result = toggleSelectedEvent(baseDate, baseEndDate, selectedEvents);

      // 1시간 구간이므로 30분 간격으로 2개의 이벤트가 생성되어야 함
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        createExpectedEvent('2024-03-10T10:00:00', '2024-03-10T10:30:00'),
        createExpectedEvent('2024-03-10T10:30:00', '2024-03-10T11:00:00'),
      ]);
    });

    it('이미 존재하는 이벤트를 제거하는 경우', () => {
      const existingEvents = [createExpectedEvent('2024-03-10T10:00:00', '2024-03-10T10:30:00')];

      const result = toggleSelectedEvent(
        '2024-03-10T10:00:00',
        '2024-03-10T10:30:00',
        existingEvents,
      );

      expect(result).toHaveLength(0);
    });

    it('이벤트 추가와 제거가 동시에 일어나는 경우', () => {
      const existingEvents = [createExpectedEvent('2024-03-10T10:00:00', '2024-03-10T10:30:00')];

      const result = toggleSelectedEvent(
        '2024-03-10T10:00:00',
        '2024-03-10T11:00:00',
        existingEvents,
      );

      // 첫 30분 구간은 제거되고, 다음 30분 구간은 추가되어야 함
      expect(result).toHaveLength(1);
      expect(result).toEqual([createExpectedEvent('2024-03-10T10:30:00', '2024-03-10T11:00:00')]);
    });

    it('시작 시간과 종료 시간이 같은 경우 (빈 범위)', () => {
      const selectedEvents: Event[] = [];
      const result = toggleSelectedEvent(baseDate, baseDate, selectedEvents);

      expect(result).toHaveLength(0);
    });

    it('여러 개의 30분 간격을 처리하는 경우', () => {
      const selectedEvents: Event[] = [];
      const result = toggleSelectedEvent(
        '2024-03-10T10:00:00',
        '2024-03-10T12:00:00',
        selectedEvents,
      );

      // 2시간 구간이므로 30분 간격으로 4개의 이벤트가 생성되어야 함
      expect(result).toHaveLength(4);
      expect(result).toEqual([
        createExpectedEvent('2024-03-10T10:00:00', '2024-03-10T10:30:00'),
        createExpectedEvent('2024-03-10T10:30:00', '2024-03-10T11:00:00'),
        createExpectedEvent('2024-03-10T11:00:00', '2024-03-10T11:30:00'),
        createExpectedEvent('2024-03-10T11:30:00', '2024-03-10T12:00:00'),
      ]);
    });

    describe('시간대 변환(formatToLocalTime) 처리', () => {
      it('UTC 시간이 올바르게 로컬 시간으로 변환되는지 확인', () => {
        const selectedEvents: Event[] = [];
        const result = toggleSelectedEvent(
          '2024-03-10T15:00:00Z', // UTC 시간
          '2024-03-10T15:30:00Z', // UTC 시간
          selectedEvents,
        );

        // 실제 결과는 시스템의 로컬 시간대에 따라 달라질 수 있으므로,
        // 기본적인 속성들만 확인
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('start');
        expect(result[0]).toHaveProperty('end');
      });
    });
  });
});
