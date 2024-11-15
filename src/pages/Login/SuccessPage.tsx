import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useReissueAccessToken } from '@/api/hooks/useReissueAccessToken';
import { RouterPath } from '@/routes/path';

export const SuccessPage = () => {
  console.log('SuccessPage.tsx의 SuccessPage 컴포넌트 실행');
  const navigate = useNavigate();
  const { refetch, status, error } = useReissueAccessToken();

  useEffect(() => {
    console.log('SuccessPage.tsx의 SuccessPage 컴포넌트의 useEffect 실행');
    refetch();
  }, [refetch]);

  if (status === 'pending') {
    return null;
  }

  if (status === 'success') navigate(RouterPath.home);

  if (status === 'error' && error) {
    console.error('토큰을 가져오는데 실패했습니다.', error);
    navigate(RouterPath.login);
  }

  return null;
};
