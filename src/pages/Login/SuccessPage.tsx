import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReissueAccessToken } from '@/api/hooks/useReissueAccessToken';
import { RouterPath } from '@/routes/path';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { refetch, status, error } = useReissueAccessToken();

  useEffect(() => {
    refetch(); // 컴포넌트가 로드될 때 토큰 재발급 요청 수행
  }, [refetch]);

  useEffect(() => {
    if (status === 'success') {
      navigate(RouterPath.home); // 성공 시 홈 페이지로 이동
    } else if (status === 'error' && error) {
      console.error('토큰을 가져오던 중 에러 발생', error);
    }
  }, [status, error, navigate]);

  return null;
};
