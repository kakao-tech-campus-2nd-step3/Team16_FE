import { rest } from 'msw';

import { getMyMeetingsPath } from '../hooks/useGetMyMeetings';

export const meetingMockhandler = [
  rest.get(getMyMeetingsPath(), (_, res, ctx) => {
    return res(ctx.json(MY_MEETING_MOCK));
  }),
];

const MY_MEETING_MOCK = {
  status: null,
  message: null,
  data: [
    {
      meetingId: 1,
      baseLocation: {
        locationId: 18577297,
        address: '경기 성남시 분당구 판교역로 166',
        latitude: 37.39570088983171,
        longitude: 127.1104335101161,
      },
      title: '밥먹자',
      confirmedDateTime: '2022-10-28T03:00:00Z',
      confirmedFood: {
        food_id: 1001,
        category: '한식',
        name: '불고기',
      },
    },
    {
      meetingId: 2,
      baseLocation: {
        locationId: 18577297,
        address: '경기 성남시 분당구 판교역로 166',
        latitude: 37.39570088983171,
        longitude: 127.1104335101161,
      },
      title: '밥먹자',
      confirmedDateTime: null,
      confirmedFood: null,
    },
  ],
};
