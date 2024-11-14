import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchInstance } from '@/api/instance';

export const getReissueTokenPath = () => `${baseURL}/auth/access-token`;

export const getReissueToken = async () => {
  const response = await fetchInstance.get(getReissueTokenPath());
  return response.data;
};

export const useReissueAccessToken = () => {
  return useQuery({
    queryKey: ['reissueToken'],
    queryFn: getReissueToken,
    enabled: false,
  });
};
