import { rest } from 'msw';

import { baseURL } from '../instance';

export const LoginMockhandler = [
  rest.get(`${baseURL}/login`, (_, res, ctx) => {
    return res(
      ctx.status(LOGIN_REDIRECT_MOCK.status),
      ctx.set('Location', LOGIN_REDIRECT_MOCK.headers.Location),
    );
  }),
  rest.get(`${baseURL}/login/success`, (_, res, ctx) => {
    return res(
      ctx.status(LOGIN_SUCCESS_RESPONSE_MOCK.status),
      ctx.json(LOGIN_SUCCESS_RESPONSE_MOCK),
    );
  }),
];

const LOGIN_REDIRECT_MOCK = {
  status: 302,
  headers: { Location: `${baseURL}/login/success` },
};

const LOGIN_SUCCESS_RESPONSE_MOCK = {
  status: 200,
  message: '로그인 성공',
  data: {
    accessToken: 'mockAccessToken123',
    user: {
      id: 1,
      name: 'Mock User',
    },
    redirectTo: `${baseURL}/login/success`,
  },
};
