import React from 'react';
import { useSuccessLogin } from 'src/api/hooks/useSuccessLogin';

export const SuccessPage: React.FC = () => {
  useSuccessLogin();

  return (
    <div>
      <h1>로그인 성공!</h1>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 1083c82 (feat(routes): 성공 및 실패 페이지 경로 추가)
