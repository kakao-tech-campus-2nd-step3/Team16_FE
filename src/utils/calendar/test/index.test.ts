import { defaultEventToGroupEvent } from '../converter';
import { checkIsWithinEventRange } from '../index';

describe('Calendar', () => {
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
  describe('isWithinEventRange', () => {
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
});
