import type { Event } from '@/service/Calendar/types';

import { checkIsOverlapping, checkIsWithinEventRange } from '../validation';

describe('validation', () => {
  describe('checkIsWithinEventRange', () => {
    describe('입력받은 clickedTime 시간이 입력받은 event 내에 존재하면', () => {
      it('clickedTime 시간부터 duration까지의 시간이 입력받은 event 내에 존재하면 true를 반환한다.', () => {
        const events = [
          {
            start: new Date('2023-01-01T10:00:00Z').toString(),
            end: new Date('2023-01-01T12:00:00Z').toString(),
            backgroundColor: 'rgba(105, 132, 116, 0.7)',
            borderColor: '698474',
            display: 'background',
          },
        ];

        const clickedTime = new Date('2023-01-01T10:30:00Z');
        const duration = 1;

        const result = checkIsWithinEventRange({ clickedTime, duration, events });
        expect(result.isValid).toBe(true);
        expect(result.event).toEqual(events[0]);
      });

      it('clickedTime 시간부터 duration까지의 시간이 입력받은 event 범위를 벗어나면 false를 반환한다.', () => {
        const events = [
          {
            start: new Date('2023-01-01T10:00:00Z').toString(),
            end: new Date('2023-01-01T12:00:00Z').toString(),
            backgroundColor: 'rgba(105, 132, 116, 0.7)',
            borderColor: '698474',
            display: 'background',
          },
        ];

        const clickedTime = new Date('2023-01-01T11:30:00Z');
        const duration = 2;

        const result = checkIsWithinEventRange({ clickedTime, duration, events });
        expect(result.isValid).toBe(false);
      });
    });
    it('clickedTime 시간부터 duration까지의 시간이 입력받은 event 내에 존재하지 않으면 false를 반환한다.', () => {
      const events = [
        {
          start: new Date('2023-01-01T10:00:00Z').toString(),
          end: new Date('2023-01-01T12:00:00Z').toString(),
          backgroundColor: 'rgba(105, 132, 116, 0.7)',
          borderColor: '698474',
          display: 'background',
        },
      ];

      const clickedTime = new Date('2023-01-01T09:00:00Z');
      const duration = 1;

      const result = checkIsWithinEventRange({ clickedTime, duration, events });
      expect(result.isValid).toBe(false);
    });
  });

  describe('checkIsOverlapping', () => {
    it('이벤트가 겹치는 경우 true를 반환한다.', () => {
      const start = new Date('2024-01-01T10:00:00');
      const end = new Date('2024-01-01T12:00:00');
      const displayedEvents: Event[] = [
        {
          start: new Date('2024-01-01T11:00:00').toISOString(),
          end: new Date('2024-01-01T13:00:00').toISOString(),
        } as Event,
      ];

      expect(checkIsOverlapping(start, end, displayedEvents)).toBe(true);
    });

    it('이벤트가 겹치지 않는 경우 false를 반환해야 한다', () => {
      const start = new Date('2024-01-01T10:00:00');
      const end = new Date('2024-01-01T12:00:00');
      const displayedEvents: Event[] = [
        {
          start: new Date('2024-01-01T13:00:00').toISOString(),
          end: new Date('2024-01-01T14:00:00').toISOString(),
        } as Event,
      ];

      expect(checkIsOverlapping(start, end, displayedEvents)).toBe(false);
    });
  });
});
