import { rest } from 'msw';

import { baseURL } from '../instance';


export const foodMockHandler = [
  
  rest.get(`${baseURL}/api/foods`, (req, res, ctx) => {
    const category = req.url.searchParams.get('category'); // 쿼리 파라미터에서 category 값 추출

    const filteredFoods = category
      ? FOOD_MOCK_DATA.filter((food) => food.category === category)
      : FOOD_MOCK_DATA;

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        message: '음식 조회 성공',
        data: filteredFoods, // data 키에 filteredFoods 배열 전달
      })
    );
  }),
];

const FOOD_MOCK_DATA = [
  { food_id: 1, category: '한식', name: '삼겹살' },
  { food_id: 123, category: '한식', name: '제육볶음' },
  { food_id: 2, category: '한식', name: '김치찌개' },
  { food_id: 3, category: '한식', name: '된장찌개' },
  { food_id: 4, category: '중식', name: '짜장면' },
  { food_id: 5, category: '중식', name: '마라탕' },
  { food_id: 6, category: '중식', name: '양꼬치' },
  { food_id: 7, category: '일식', name: '라멘' },
  { food_id: 8, category: '일식', name: '우동' },
  { food_id: 9, category: '일식', name: '돈카츠' },
  { food_id: 10, category: '양식', name: '피자' },
  { food_id: 11, category: '양식', name: '함박스테이크' },
  { food_id: 12, category: '카페,디저트', name: '티라미수' },
  { food_id: 13, category: '카페,디저트', name: '마카롱' },
  { food_id: 14, category: '술집', name: '치킨' },
  { food_id: 15, category: '술집', name: '닭발' },
];
