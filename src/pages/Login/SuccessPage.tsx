import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReissueAccessToken } from '@/api/hooks/useReissueAccessToken';
import { RouterPath } from '@/routes/path';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const { refetch, status, error } = useReissueAccessToken();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (status === 'success') {
      navigate(RouterPath.home);
    } else if (status === 'error' && error) {
      console.error('토큰을 가져오던 중 에러 발생', error);
    }
  }, [status, error, navigate]);

  return null;
};
