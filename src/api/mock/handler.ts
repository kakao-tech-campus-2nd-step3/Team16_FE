import { rest } from 'msw';

export const handlers = [
  // 'preferences' 엔드포인트 모킹 (추가 요청 핸들러)
  rest.post('/api/preferences', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ message: 'Preference added successfully', foodId: body.foodId })
    );
  }),

  // 'non-preferences' 엔드포인트 모킹
  rest.post('/api/non-preferences', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(200),
      ctx.json({ message: 'Non-preference added successfully', foodId: body.foodId })
    );
  }),

  // 'preferences' 삭제 엔드포인트 모킹
  rest.delete('/api/preferences', async (req, res, ctx) => {
    const { foodId } = await req.json();
    if (!foodId) {
      return res(
        ctx.status(400),
        ctx.json({ errorMessage: 'Food ID is required' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({ message: 'Preference deleted successfully', foodId })
    );
  }),

  // 'non-preferences' 삭제 엔드포인트 모킹
  rest.delete('/api/non-preferences', async (req, res, ctx) => {
    const { foodId } = await req.json();
    if (!foodId) {
      return res(
        ctx.status(400),
        ctx.json({ errorMessage: 'Food ID is required' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({ message: 'Non-preference deleted successfully', foodId })
    );
  }),
];
