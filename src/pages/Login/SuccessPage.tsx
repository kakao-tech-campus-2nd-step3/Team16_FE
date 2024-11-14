import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReissueAccessToken } from '@/api/hooks/useReissueAccessToken';
import { RouterPath } from '@/routes/path';

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);
  const { refetch, status, data, error } = useReissueAccessToken(false);

  useEffect(() => {
    if (!hasFetched) {
      refetch(); 
      setHasFetched(true);
    }
  }, [refetch, hasFetched]);

  useEffect(() => {
    if (status === 'success' && data) {
      navigate(RouterPath.home);
    } else if (status === 'error' && error) {
      console.error('토큰을 가져오던 중 에러 발생', error);
    }
  }, [status, data, error, navigate]);

  return null;
};
