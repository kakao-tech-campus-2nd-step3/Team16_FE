import type { Meeting } from '@/api/hooks/Meeting/useGetMyMeetings';

import { convertToLocaleString, convertToMeeting } from '..';

describe('convertToMeeting', () => {
  it('확정/미확정 모임을 분리해야 한다', () => {
    const meetings: Meeting[] = [
      {
        meetingId: 1,
        confirmedDateTime: '2023-10-01T10:00:00Z',
        title: '철수모임',
        baseLocation: {
          locationId: 1,
          address: 'Seoul',
          latitude: 37.5665,
          longitude: 126.978,
        },
        confirmedFood: {
          food_id: 1,
          category: 'Korean',
          name: '비빔밥',
        },
      },
      {
        meetingId: 2,
        confirmedDateTime: null,
        title: '영희모임',
        baseLocation: {
          locationId: 2,
          address: 'Busan',
          latitude: 35.1796,
          longitude: 129.0756,
        },
        confirmedFood: {
          food_id: 2,
          category: '일식',
          name: '초밥',
        },
      },
      {
        meetingId: 3,
        confirmedDateTime: '2023-10-02T12:00:00Z',
        title: '민수모임',
        baseLocation: {
          locationId: 3,
          address: 'Incheon',
          latitude: 37.4563,
          longitude: 126.7052,
        },
        confirmedFood: {
          food_id: 3,
          category: '중식',
          name: '자장면',
        },
      },
      {
        meetingId: 4,
        confirmedDateTime: null,
        title: '영수모임',
        baseLocation: {
          locationId: 4,
          address: 'Daegu',
          latitude: 35.8714,
          longitude: 128.6014,
        },
        confirmedFood: {
          food_id: 4,
          category: '양식',
          name: '파스타',
        },
      },
    ];

    const result = convertToMeeting(meetings);

    expect(result.confirmedMeetings).toHaveLength(2);
    expect(result.nonConfirmedMeetings).toHaveLength(2);
    expect(result.confirmedMeetings).toEqual([
      {
        baseLocation: {
          address: 'Seoul',
          latitude: 37.5665,
          locationId: 1,
          longitude: 126.978,
        },
        confirmedDateTime: '2023-10-01T10:00:00Z',
        confirmedFood: {
          category: 'Korean',
          food_id: 1,
          name: '비빔밥',
        },
        meetingId: 1,
        title: '철수모임',
      },
      {
        baseLocation: {
          address: 'Incheon',
          latitude: 37.4563,
          locationId: 3,
          longitude: 126.7052,
        },
        confirmedDateTime: '2023-10-02T12:00:00Z',
        confirmedFood: {
          category: '중식',
          food_id: 3,
          name: '자장면',
        },
        meetingId: 3,
        title: '민수모임',
      },
    ]);
    expect(result.nonConfirmedMeetings).toEqual([
      {
        baseLocation: {
          address: 'Busan',
          latitude: 35.1796,
          locationId: 2,
          longitude: 129.0756,
        },
        confirmedDateTime: null,
        confirmedFood: {
          category: '일식',
          food_id: 2,
          name: '초밥',
        },
        meetingId: 2,
        title: '영희모임',
      },
      {
        baseLocation: {
          address: 'Daegu',
          latitude: 35.8714,
          locationId: 4,
          longitude: 128.6014,
        },
        confirmedDateTime: null,
        confirmedFood: {
          category: '양식',
          food_id: 4,
          name: '파스타',
        },
        meetingId: 4,
        title: '영수모임',
      },
    ]);
  });
});

describe('convertToLocaleString', () => {
  it('날짜 문자열을 한국어 형식으로 변환해야 한다', () => {
    const date = '2023-10-01T10:00:00Z';
    const result = convertToLocaleString(date);

    expect(result).toBe('2023년 10월 1일 일요일 오후 7:00');
  });

  it('should handle invalid date string gracefully', () => {
    const date = 'invalid-date';
    const result = convertToLocaleString(date);

    expect(result).toBe('Invalid Date');
  });
});
