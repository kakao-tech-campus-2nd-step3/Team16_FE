import { getCurrentDateStrings } from '../index';

describe('getCurrentDateStrings', () => {
  it('기준 날짜에 대한 올바른 날짜 문자열을 반환한다', () => {
    const baseDate = '2023-10-01T00:00:00Z';
    const result = getCurrentDateStrings(baseDate);

    expect(result.from).toBe('2023-10-16T00:00:00Z');
    expect(result.to).toBe('2023-09-17T00:00:00Z');
  });

  it('서로 다른 시간대를 올바르게 처리한다', () => {
    const baseDate = '2023-10-01T12:00:00+02:00';
    const result = getCurrentDateStrings(baseDate);

    expect(result.from).toBe('2023-10-16T10:00:00Z');
    expect(result.to).toBe('2023-09-17T10:00:00Z');
  });
});
