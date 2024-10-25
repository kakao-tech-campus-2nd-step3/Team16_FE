import { rest } from 'msw';

import { createMeetingPath } from '../hooks/useCreateMeeting';
import { getMyMeetingsPath } from '../hooks/useGetMyMeetings';
import { getparticipantPath } from '../hooks/useGetParticipant';

export const meetingMockHandler = [
  rest.get(getMyMeetingsPath(), (_, res, ctx) => {
    return res(ctx.json(MY_MEETING_MOCK));
  }),
  rest.post(createMeetingPath(), (_, res, ctx) => {
    return res(ctx.json(CREATE_MEETING_MOCK));
  }),
  rest.get(
    getparticipantPath({
      meetingId: '1',
    }),
    (_, res, ctx) => {
      return res(ctx.json(PARTICIPANT));
    },
  ),
];

const CREATE_MEETING_MOCK = {
  status: 200,
  message: '모임 생성 성공',
  data: null,
};

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

const PARTICIPANT = {
  status: 200,
  message: '참가자 조회 성공',
  data: [
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 12345,
      nickname: '쿠키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
    {
      member_id: 54312,
      nickname: '구키즈',
      thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
      profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
    },
  ],
};
