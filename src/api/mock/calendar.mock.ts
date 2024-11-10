import { rest } from 'msw';

import { getGroupCalendarPath } from '../hooks/useGetGroupCalendar';
import { getMyEventPath } from '../hooks/useGetMyEvents';
import { getPersonalPath } from '../hooks/useGetPersonalEvents';

export const calendarMockHandler = [
  rest.get(getMyEventPath(), (_, res, ctx) => {
    return res(ctx.json(CALENDAR_MOCK));
  }),
  rest.get(getGroupCalendarPath('1'), (_, res, ctx) => {
    return res(ctx.json(GROUP_CALENDAR_MOCK));
  }),
  rest.get(getPersonalPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(PERSONAL_EVENTS_MOCK));
  }),
];

const CALENDAR_MOCK = {
  status: null,
  message: null,
  data: [
    {
      id: '6554545a5df8367886f9d2c5',
      title: '누구랑 밥 먹기',
      type: null,
      calendar_id: null,
      time: {
        start_at: '2024-10-01T03:00:00Z',
        end_at: '2024-10-01T06:00:00Z',
        time_zone: 'Asia/Seoul',
        all_day: false,
      },
      is_host: false,
      is_recur_event: false,
      rrule: null,
      dt_start: null,
      description: null,
      location: null,
      reminders: null,
      color: null,
      memo: null,
    },
    {
      id: '6554545a5df8367886f9d5',
      title: '누구로 하지??',
      type: null,
      calendar_id: null,
      time: {
        start_at: '2024-10-03T03:00:00Z',
        end_at: '2024-10-03T06:00:00Z',
        time_zone: 'Asia/Seoul',
        all_day: false,
      },
      is_host: false,
      is_recur_event: false,
      rrule: null,
      dt_start: null,
      description: null,
      location: null,
      reminders: null,
      color: null,
      memo: null,
    },
  ],
};

const GROUP_CALENDAR_MOCK = {
  status: 200,
  message: '모임 공통 시간표 조회 성공',
  data: {
    startDate: '2024-10-31',
    endDate: '2024-11-01',
    durationTime: 3,
    availableTime: [
      {
        startAt: '2024-10-31T09:00:00',
        endAt: '2024-10-31T17:00:00',
        timeZone: 'UTC',
        allDay: false,
      },
      {
        startAt: '2024-11-01T09:00:00',
        endAt: '2024-11-01T17:00:00',
        timeZone: 'UTC',
        allDay: false,
      },
    ],
  },
};

const PERSONAL_EVENTS_MOCK = {
  status: 200,
  message: '모임별 개인 시간표 조회 성공',
  data: {
    meeting_personal_times: [
      {
        start_at: '2024-10-08T09:00:00',
        end_at: '2024-10-08T12:00:00',
        time_zone: 'Asia/Seoul',
        all_day: false,
      },
      {
        start_at: '2024-10-10T09:00:00',
        end_at: '2024-10-10T15:00:00',
        time_zone: 'Asia/Seoul',
        all_day: false,
      },
    ],
  },
};
