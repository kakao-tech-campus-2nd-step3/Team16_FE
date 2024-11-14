import { rest } from 'msw';

import { getConfirmPath } from '@/api/hooks/Meeting/useConfirm';
import { createMeetingPath } from '@/api/hooks/Meeting/useCreateMeeting';
import { getConfirmInfoPath } from '@/api/hooks/Meeting/useGetConfirmInfo';
import { getMeetingInfoPath } from '@/api/hooks/Meeting/useGetMeetingInfo';
import { getMeetingNonPreferencesPath } from '@/api/hooks/Meeting/useGetMeetingNonPreferences';
import { getMeetingPreferencesPath } from '@/api/hooks/Meeting/useGetMeetingPreferences';
import { getMyMeetingsPath } from '@/api/hooks/Meeting/useGetMyMeetings';
import { getparticipantPath } from '@/api/hooks/Meeting/useGetParticipant';
import { getPermissionPath } from '@/api/hooks/Meeting/useGetPermission';
import { getRecommendMenuPath } from '@/api/hooks/Meeting/useGetRecommandMenu';
import { joinMeetingPath } from '@/api/hooks/Meeting/useJoinMeeting';
import { getLeaveGroupPath } from '@/api/hooks/Meeting/useLeaveGroup';
import { getUpdatePersonalPath } from '@/api/hooks/Meeting/useUpdatePersonal';

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
  rest.get(
    getRecommendMenuPath({
      meetingId: '1',
    }),
    (_, res, ctx) => {
      return res(ctx.json(RECOMMEND_MENU_MOCK));
    },
  ),
  rest.delete(getLeaveGroupPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json({ message: '성공' }));
  }),
  rest.get(getMeetingInfoPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(MEETING_INFO_MOCK));
  }),
  rest.get(getPermissionPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(PERMISSION_MOCK));
  }),
  rest.post(getConfirmPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json({ message: '확정 성공' }));
  }),
  rest.post(joinMeetingPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(JOIN_MEETING_MOCK));
  }),
  rest.get(getConfirmInfoPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(CONFIRMED_INFO_MOCK));
  }),
  rest.put(getUpdatePersonalPath('1'), (_, res, ctx) => {
    return res(ctx.json(PERSONAL_MEETING_MOCK));
  }),
  rest.get(getMeetingPreferencesPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(MEETING_PREFERENCES_MOCK));
  }),
  rest.get(getMeetingNonPreferencesPath({ meetingId: '1' }), (_, res, ctx) => {
    return res(ctx.json(MEETING_NONPREFERENCES_MOCK));
  }),
];

const CREATE_MEETING_MOCK = {
  status: 200,
  message: '모임 생성 성공',
  data: {
    meetingId: 1,
  },
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

const RECOMMEND_MENU_MOCK = {
  status: 200,
  message: '모임 추천 음식 조회 성공',
  data: [
    {
      food_id: 1,
      category: '한식',
      name: '삼겹살',
    },
    {
      food_id: 123,
      category: '한식',
      name: '제육볶음',
    },
    {
      food_id: 2,
      category: '한식',
      name: '김치찌개',
    },
    {
      food_id: 3,
      category: '한식',
      name: '된장찌개',
    },
    {
      food_id: 4,
      category: '중식',
      name: '짜장면',
    },
    {
      food_id: 5,
      category: '중식',
      name: '마라탕',
    },
    {
      food_id: 6,
      category: '중식',
      name: '양꼬치',
    },
    {
      food_id: 7,
      category: '일식',
      name: '라멘',
    },
    {
      food_id: 8,
      category: '일식',
      name: '우동',
    },
    {
      food_id: 9,
      category: '일식',
      name: '돈카츠',
    },
    {
      food_id: 10,
      category: '양식',
      name: '피자',
    },
    {
      food_id: 11,
      category: '양식',
      name: '함박스테이크',
    },
    {
      food_id: 12,
      category: '카페,디저트',
      name: '티라미수',
    },
    {
      food_id: 13,
      category: '카페,디저트',
      name: '마카롱',
    },
    {
      food_id: 14,
      category: '술집',
      name: '치킨',
    },
    {
      food_id: 15,
      category: '술집',
      name: '닭발',
    },
    {
      food_id: 10,
      category: '양식',
      name: '피자',
    },
    {
      food_id: 11,
      category: '양식',
      name: '함박스테이크',
    },
    {
      food_id: 12,
      category: '카페,디저트',
      name: '티라미수',
    },
    {
      food_id: 13,
      category: '카페,디저트',
      name: '마카롱',
    },
    {
      food_id: 14,
      category: '술집',
      name: '치킨',
    },
    {
      food_id: 15,
      category: '기타',
      name: '닭발',
    },
  ],
};

const MEETING_INFO_MOCK = {
  status: 200,
  message: '모임 정보 조회 성공',
  data: {
    title: `철수 모임`,
    startDate: '2024-10-01',
    endDate: '2024-10-12',
    startTime: '09:00:00',
    endTime: '15:00:00',
  },
};

const PERMISSION_MOCK = {
  status: 200,
  message: '권한 조회 성공',
  data: {
    isHost: true,
    // isHost: false,
  },
};

const JOIN_MEETING_MOCK = {
  status: 200,
  message: '모임 참여 성공',
  data: null,
};

const CONFIRMED_INFO_MOCK = {
  status: 200,
  message: '모임 확정 날짜, 확정 음식 조회 성공',
  data: null,
  // data: {
  //   confirmedDateTime: '2024-10-31T03:00:00Z',
  //   confirmedFood: {
  //     foodId: 1001,
  //     category: '한식',
  //     name: '삼겹살',
  //   },
  //   baseLocation: {
  //     locationId: 18577297,
  //     address: '전남대학교',
  //     latitude: 35.1755091,
  //     longitude: 126.9071166,
  //   },
  // },
};

const PERSONAL_MEETING_MOCK = {
  status: 200,
  message: '모임별 개인 정보 수정 성공',
  data: null,
};

const MEETING_PREFERENCES_MOCK = {
  status: 200,
  message: '모임별 개인 선호 음식 조회 성공',
  data: [
    {
      food_id: 1001,
      category: '한식',
      name: '불고기',
    },
    {
      food_id: 5001,
      category: '카페,디저트',
      name: '커피',
    },
  ],
};

const MEETING_NONPREFERENCES_MOCK = {
  status: 200,
  message: '모임별 개인 비선호 음식 조회 성공',
  data: [
    {
      food_id: 1003,
      category: '한식',
      name: '김치찌개',
    },
    {
      food_id: 2007,
      category: '양식',
      name: '리조또',
    },
  ],
};
