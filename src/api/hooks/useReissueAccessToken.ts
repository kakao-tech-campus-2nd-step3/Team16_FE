import { useQuery } from '@tanstack/react-query';

import { baseURL,fetchWithToken } from '@/api/instance';
import { authLocalStorage } from '@/utils/storage';

export const getReissueTokenPath = () => `${baseURL}/auth/access-token`;

// API 호출 함수
export const reissueAccessToken = async () => {
  const response = await fetchWithToken.get(getReissueTokenPath(), {
    withCredentials: true, // 쿠키 포함 요청
  });

  if (response.status === 200) {
    console.log('토큰 재발급 성공:', response.headers);
    const newAccessToken = response.headers['access-token'];
    authLocalStorage.set(newAccessToken);
    return newAccessToken;
  } else {
    throw new Error('Failed to reissue access token');
  }
};

export const useReissueAccessToken = () => {
  return useQuery({
    queryKey: ['reissueToken'],
    queryFn: reissueAccessToken,
    enabled: false, // 컴포넌트가 마운트될 때 자동 실행 방지
  });
};
