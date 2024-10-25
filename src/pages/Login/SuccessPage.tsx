import React from 'react';
import { useSuccessLogin } from 'src/api/hooks/useSuccessLogin';

export const SuccessPage: React.FC = () => {
  useSuccessLogin();

  return (
    <div>
      <h1>로그인 성공!</h1>
    </div>
  );
};
