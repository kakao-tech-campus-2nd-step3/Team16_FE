import React from 'react';
import { KakaoLoginButton } from 'src/components/common/Button/kakaoLogin';

export const LoginPage: React.FC = () => {
  const login = () => {
    const baseURL = process.env.REACT_APP_API_URL
    window.location.href = `${baseURL}/login`
  }

  return (
    <div>
      <h1>로그인 페이지</h1>
      <KakaoLoginButton onClick={login} />
    </div>
  );
};