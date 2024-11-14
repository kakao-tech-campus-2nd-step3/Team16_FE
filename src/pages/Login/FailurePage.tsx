import React from 'react';

import { baseURL } from '@/api/instance';
import { KakaoLoginButton } from '@/components/common/Button/kakaoLogin';

export const FailurePage: React.FC = () => {
  const login = () => {
    window.location.href = `${baseURL}/auth/login`;
  };

  return (
    <div style={styles.container}>
      <h1>로그인 실패</h1>
      <p>로그인 중 오류가 발생하였습니다. 다시 시도해 주세요.</p>
      <KakaoLoginButton onClick={login} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center' as const,
  },
};