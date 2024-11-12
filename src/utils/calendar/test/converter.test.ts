import type { PersonalResponse } from '@/types';

import {
  convertSelectedTimesToEvents,
  convertToInitialTimes,
  defaultEventToGroupEvent,
} from '../converter';

describe('converter', () => {
  describe('convertToInitialTimes', () => {
    it('개인 응답 데이터를 30분 단위 시간 슬롯으로 변환해야 한다', () => {
      const mockData: PersonalResponse = {
        meeting_personal_times: [
          {
            start_at: '2024-01-01T09:00:00',
            end_at: '2024-01-01T10:00:00',
            time_zone: 'Asia/Seoul',
            all_day: false,
          },
        ],
      };

      const result = convertToInitialTimes(mockData);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        startAt: '2024-01-01T09:00:00',
        endAt: '2024-01-01T09:30:00',
        timeZone: 'Asia/Seoul',
        allDay: false,
      });
      expect(result[1]).toEqual({
        startAt: '2024-01-01T09:30:00',
        endAt: '2024-01-01T10:00:00',
        timeZone: 'Asia/Seoul',
        allDay: false,
      });
    });

    it('여러 시간대를 처리할 수 있어야 한다', () => {
      const mockData: PersonalResponse = {
        meeting_personal_times: [
          {
            start_at: '2024-01-01T09:00:00',
            end_at: '2024-01-01T10:00:00',
            time_zone: 'Asia/Seoul',
            all_day: false,
          },
          {
            start_at: '2024-01-01T14:00:00',
            end_at: '2024-01-01T15:00:00',
            time_zone: 'Asia/Seoul',
            all_day: false,
          },
        ],
      };

      const result = convertToInitialTimes(mockData);
      expect(result).toHaveLength(4);
    });
  });
  describe('convertSelectedTimesToEvents', () => {
    it('선택된 시간을 이벤트 형식으로 변환해야 한다', () => {
      const selectedTimes = [
        {
          startAt: '2024-01-01T09:00:00',
          endAt: '2024-01-01T09:30:00',
          timeZone: 'Asia/Seoul',
          allDay: false,
        },
      ];

      const result = convertSelectedTimesToEvents(selectedTimes);

      expect(result).toEqual([
        {
          id: '0',
          title: '',
          date: '2024-01-01T09:00:00',
          start: '2024-01-01T09:00:00',
          end: '2024-01-01T09:30:00',
          allDay: false,
        },
      ]);
    });

    it('여러 개의 시간을 변환할 수 있어야 한다', () => {
      const selectedTimes = [
        {
          startAt: '2024-01-01T09:00:00',
          endAt: '2024-01-01T09:30:00',
          timeZone: 'Asia/Seoul',
          allDay: false,
        },
        {
          startAt: '2024-01-01T10:00:00',
          endAt: '2024-01-01T10:30:00',
          timeZone: 'Asia/Seoul',
          allDay: false,
        },
      ];

      const result = convertSelectedTimesToEvents(selectedTimes);
      expect(result).toHaveLength(2);
    });
  });
  describe('defaultEventToGroupEvent', () => {
    it('defaultEvent 타입의 객처 배열을 GroupEvent타입의 객체 배열로 변경한다.', () => {
      const events = [
        {
          start: new Date('2023-01-01T10:00:00Z').toString(),
          end: new Date('2023-01-01T12:00:00Z').toString(),
        },
        {
          start: new Date('2023-01-02T10:00:00Z').toString(),
          end: new Date('2023-01-02T12:00:00Z').toString(),
        },
      ];

      const expected = [
        {
          start: new Date('2023-01-01T10:00:00Z').toString(),
          end: new Date('2023-01-01T12:00:00Z').toString(),
          backgroundColor: 'rgba(105, 132, 116, 0.7)',
          borderColor: '698474',
          display: 'background',
        },
        {
          start: new Date('2023-01-02T10:00:00Z').toString(),
          end: new Date('2023-01-02T12:00:00Z').toString(),
          backgroundColor: 'rgba(105, 132, 116, 0.7)',
          borderColor: '698474',
          display: 'background',
        },
      ];

      const result = defaultEventToGroupEvent(events);
      expect(result).toEqual(expected);
    });
  });
});
