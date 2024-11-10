import { rest } from 'msw';

import { baseURL } from '../instance';

const getPreferencePath = () => `${baseURL}/preferences`;
const getNonPreferencePath = () => `${baseURL}/non-preferences`;
const getCategoryPath = () => `${baseURL}/food-categories`;
const getFoodsByCategoryPath = (category: string = '') => `${baseURL}/foods?category=${category}`;

export const foodMockHandler = [
  rest.get(getPreferencePath(), (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '선호 음식 조회 성공',
        data: PREFERENCE_FOOD_MOCK_DATA,
      })
    );
  }),

  rest.get(getNonPreferencePath(), (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '꺼려하는 음식 조회 성공',
        data: NON_PREFERENCE_FOOD_MOCK_DATA,
      })
    );
  }),

  rest.get(getCategoryPath(), (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '음식 카테고리 목록 조회 성공',
        data: CATEGORY_MOCK_DATA,
      })
    );
  }),

  rest.get(getFoodsByCategoryPath(), (req, res, ctx) => {
    const category = req.url.searchParams.get('category');

    if (!category || category === 'undefined') {
      return res(
        ctx.status(400),
        ctx.json({
          status: 400,
          message: '잘못된 카테고리 요청',
          data: [],
        })
      );
    }

    const filteredFoods = FOODS_BY_CATEGORY_MOCK_DATA.filter((food) => food.category === category);
    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: `${category} 카테고리의 음식 조회 성공`,
        data: filteredFoods,
      })
    );
  }),
];

const PREFERENCE_FOOD_MOCK_DATA = [
  { food_id: 1, category: '한식', name: '불고기' },
  { food_id: 2, category: '양식', name: '스테이크' },
];

const NON_PREFERENCE_FOOD_MOCK_DATA = [
  { food_id: 10, category: '양식', name: '햄버거' },
  { food_id: 11, category: '중식', name: '탕수육' },
];

const CATEGORY_MOCK_DATA = ['한식', '양식', '중식', '일식', '카페,디저트', '술집', '기타'];

const FOODS_BY_CATEGORY_MOCK_DATA = [
  { food_id: 1001, category: '한식', name: '불고기' },
  { food_id: 1002, category: '한식', name: '비빔밥' },
  { food_id: 2001, category: '양식', name: '스테이크' },
  { food_id: 2002, category: '양식', name: '파스타' },
  { food_id: 3001, category: '중식', name: '짜장면' },
  { food_id: 3002, category: '중식', name: '탕수육' },
  { food_id: 4001, category: '일식', name: '초밥' },
  { food_id: 4002, category: '일식', name: '라멘' },
  { food_id: 5001, category: '카페,디저트', name: '커피' },
  { food_id: 5002, category: '카페,디저트', name: '케이크' },
  { food_id: 6001, category: '술집', name: '맥주' },
  { food_id: 6002, category: '술집', name: '소주' },
  { food_id: 7001, category: '기타', name: '샐러드' },
  { food_id: 7002, category: '기타', name: '토스트' },
];
