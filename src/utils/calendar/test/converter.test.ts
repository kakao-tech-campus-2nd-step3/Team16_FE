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
});
