import React from 'react';
import KakaoLogin from 'src/components/common/Button/kakaoLogin';

const LoginPage: React.FC = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/api/auth/login';
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <KakaoLogin onClick={handleKakaoLogin} />
    </div>
  );
};

export default LoginPage;
