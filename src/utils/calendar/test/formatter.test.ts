import { formatToLocalTime } from '../formatter';

describe('formatter', () => {
  describe('formatToLocalTime', () => {
    it('날짜를 올바른 형식으로 변환해야 한다', () => {
      const testDate = new Date(2023, 11, 25, 14, 30);
      const expected = '2023-12-25T14:30:00';
      expect(formatToLocalTime(testDate)).toBe(expected);
    });
  });
});
