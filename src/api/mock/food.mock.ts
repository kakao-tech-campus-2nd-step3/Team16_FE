import { rest } from 'msw';

import { getAddNonPreferenceFoodPath } from '../hooks/useAddNonPreferenceFood';
import { getAddPreferenceFoodPath } from '../hooks/useAddPreferenceFood';
import { getDeleteNonPreferenceFoodPath } from '../hooks/useDeleteNonPreference';
import { getDeletePreferenceFoodPath } from '../hooks/useDeletePreference';
import { getCategoryPath } from '../hooks/useGetCategory';
import { getFoodsByCategoryPath } from '../hooks/useGetFood';
import { getNonPreferencePath } from '../hooks/useGetNonPreferenceFoods';
import { getPreferencePath } from '../hooks/useGetPreferenceFoods';

export const foodMockHandler = [
  rest.get(getPreferencePath(), (_req, res, ctx) => {
    return res(ctx.json(PREFERENCE_FOOD_MOCK));
  }),

  rest.get(getNonPreferencePath(), (_req, res, ctx) => {
    return res(ctx.json(NON_PREFERENCE_FOOD_MOCK));
  }),

  rest.get(getCategoryPath(), (_req, res, ctx) => {
    return res(ctx.json(CATEGORY_MOCK));
  }),

  rest.get(getFoodsByCategoryPath(), (req, res, ctx) => {
    const category = req.url.searchParams.get('category');

    if (!category || category === 'undefined') {
      return res(
        ctx.json({
          status: 400,
          message: '잘못된 카테고리 요청',
          data: [],
        }),
      );
    }

    const filteredFoods = FOODS_BY_CATEGORY_MOCK.data.filter((food) => food.category === category);
    return res(
      ctx.json({
        status: 200,
        message: `${category} 카테고리의 음식 조회 성공`,
        data: filteredFoods,
      }),
    );
  }),

  rest.post(getAddPreferenceFoodPath(), async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json({
        status: 200,
        message: '선호 음식 추가 성공',
        data: { foodId: body.foodId },
      }),
    );
  }),

  rest.post(getAddNonPreferenceFoodPath(), async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.json({
        status: 200,
        message: '비선호 음식 추가 성공',
        data: { foodId: body.foodId },
      }),
    );
  }),

  rest.delete(getDeletePreferenceFoodPath(), async (req, res, ctx) => {
    const { foodId } = await req.json();
    if (!foodId) {
      return res(
        ctx.json({
          status: 400,
          message: 'Food ID is required',
          data: null,
        }),
      );
    }
    return res(
      ctx.json({
        status: 200,
        message: '선호 음식 삭제 성공',
        data: { foodId },
      }),
    );
  }),

  rest.delete(getDeleteNonPreferenceFoodPath(), async (req, res, ctx) => {
    const { foodId } = await req.json();
    if (!foodId) {
      return res(
        ctx.json({
          status: 400,
          message: 'Food ID is required',
          data: null,
        }),
      );
    }
    return res(
      ctx.json({
        status: 200,
        message: '비선호 음식 삭제 성공',
        data: { foodId },
      }),
    );
  }),
];

const PREFERENCE_FOOD_MOCK = {
  status: 200,
  message: '선호 음식 조회 성공',
  data: [
    { food_id: 1001, category: '한식', name: '불고기' },
    { food_id: 2001, category: '양식', name: '스테이크' },
  ],
};

const NON_PREFERENCE_FOOD_MOCK = {
  status: 200,
  message: '꺼려하는 음식 조회 성공',
  data: [
    { food_id: 2003, category: '양식', name: '햄버거' },
    { food_id: 3002, category: '중식', name: '탕수육' },
  ],
};

const CATEGORY_MOCK = {
  status: 200,
  message: '음식 카테고리 목록 조회 성공',
  data: ['한식', '양식', '중식', '일식', '카페,디저트', '술집', '기타'],
};

const FOODS_BY_CATEGORY_MOCK = {
  status: 200,
  message: '음식 목록 조회 성공',
  data: [
    { food_id: 1001, category: '한식', name: '불고기' },
    { food_id: 1002, category: '한식', name: '비빔밥' },
    { food_id: 1003, category: '한식', name: '김치찌개' },
    { food_id: 1004, category: '한식', name: '떡갈비' },
    { food_id: 1005, category: '한식', name: '콩나물 국밥' },
    { food_id: 1006, category: '한식', name: '파전' },
    { food_id: 1007, category: '한식', name: '갈비찜' },
    { food_id: 1008, category: '한식', name: '순두부찌개' },
    { food_id: 1009, category: '한식', name: '잡채' },
    { food_id: 1010, category: '한식', name: '삼계탕' },
    { food_id: 1011, category: '한식', name: '해장국' },
    { food_id: 2001, category: '양식', name: '스테이크' },
    { food_id: 2002, category: '양식', name: '파스타' },
    { food_id: 2003, category: '양식', name: '햄버거' },
    { food_id: 2004, category: '양식', name: '피자' },
    { food_id: 2005, category: '양식', name: '샌드위치' },
    { food_id: 2006, category: '양식', name: '라자냐' },
    { food_id: 2007, category: '양식', name: '리조또' },
    { food_id: 2008, category: '양식', name: '치킨 스튜' },
    { food_id: 3001, category: '중식', name: '짜장면' },
    { food_id: 3002, category: '중식', name: '탕수육' },
    { food_id: 4001, category: '일식', name: '초밥' },
    { food_id: 4002, category: '일식', name: '라멘' },
    { food_id: 5001, category: '카페,디저트', name: '커피' },
    { food_id: 5002, category: '카페,디저트', name: '케이크' },
    { food_id: 5003, category: '카페,디저트', name: '브라우니' },
    { food_id: 5004, category: '카페,디저트', name: '크레페' },
    { food_id: 5005, category: '카페,디저트', name: '와플' },
    { food_id: 6001, category: '술집', name: '맥주' },
    { food_id: 6002, category: '술집', name: '소주' },
    { food_id: 7001, category: '기타', name: '샐러드' },
    { food_id: 7002, category: '기타', name: '토스트' },
  ],
};
