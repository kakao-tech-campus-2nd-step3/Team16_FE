import { defaultEventToGroupEvent } from '../index';

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
    it('', () => {});
  });
});
