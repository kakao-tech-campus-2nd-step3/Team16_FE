import { rest } from 'msw';

import { createMeetingPath } from '../hooks/useCreateMeeting';

export const meetingMockHandler = [
  rest.post(createMeetingPath(), (_, res, ctx) => {
    return res(ctx.json(CREATE_MEETING_MOCK));
  }),
];

const CREATE_MEETING_MOCK = {
  status: 200,
  message: '모임 생성 성공',
  data: null,
};
