import { rest } from 'msw';

import { getMyEventPath } from '../hooks/useGetMyEvents';

export const calendarMockHandler = [
  rest.get(getMyEventPath(), (_, res, ctx) => {
    return res(ctx.json(CALENDAR_MOCK));
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
        end_at: '2022-10-01T06:00:00Z',
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
        end_at: '2022-10-3T06:00:00Z',
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
