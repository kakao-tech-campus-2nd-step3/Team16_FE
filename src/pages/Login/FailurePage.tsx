import React from 'react';

import { baseURL } from '@/api/instance';
import { KakaoLoginButton } from '@/components/common/Button/kakaoLogin';

export const FailurePage: React.FC = () => {
  const login = () => {
    window.location.href = `${baseURL}/auth/login`;
  };

  return (
    <div>
      <h1>로그인 실패</h1>
      <p>카카오 서버에 문제가 있거나, 로그인이 취소되었습니다. 다시 시도해 주세요.</p>
      <KakaoLoginButton onClick={login} />
    </div>
  );
};
