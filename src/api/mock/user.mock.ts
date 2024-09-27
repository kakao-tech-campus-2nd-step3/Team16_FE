import { rest } from 'msw';

import { getUserProfilePath } from '../hooks/useGetUser';

export const userMockhandler = [
  rest.get(getUserProfilePath(), (_, res, ctx) => {
    return res(ctx.json(USER_PROFILE_MOCK));
  }),
];

const USER_PROFILE_MOCK = {
  status: 200,
  message: '프로필 조회 성공',
  data: {
    member_id: 12345,
    nickname: '쿠키즈',
    thumbnail_image_url: 'https://example.com/thumbnails/sunshine_thumb.jpg',
    profile_image_url: 'https://example.com/profiles/sunshine_profile.jpg',
  },
};
