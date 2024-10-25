import React from 'react';
import { useHandleKakaoLogin } from 'src/api/hooks/useHandleKakaoLogin';
import { KakaoLoginButton } from 'src/components/common/Button/kakaoLogin';

export const FailurePage: React.FC = () => {
  const handleKakaoLogin = useHandleKakaoLogin();

  return (
    <div>
      <h1>로그인 실패</h1>
      <p>카카오 서버에 문제가 있거나, 로그인이 취소되었습니다. 다시 시도해 주세요.</p>
      <KakaoLoginButton onClick={() => handleKakaoLogin(true)} />
    </div>
  );
};
