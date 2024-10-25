import React from 'react';
import { useHandleKakaoLogin } from 'src/api/hooks/useHandleKakaoLogin';
import { KakaoLoginButton } from 'src/components/common/Button/kakaoLogin';

export const LoginPage: React.FC = () => {
  const handleKakaoLogin = useHandleKakaoLogin();

  return (
    <div>
      <h1>로그인 페이지</h1>
      <KakaoLoginButton onClick={() => handleKakaoLogin()} />
    </div>
  );
};

export default LoginPage;
