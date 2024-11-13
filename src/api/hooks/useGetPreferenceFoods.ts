import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getPreferencePath = () => `${baseURL}/preferences`;

export const getPreferenceFoods = async () => {
  const response = await fetchWithToken.get(getPreferencePath());
  return response.data || [];
};

export const useGetPreferenceFoods = () => {
  return useQuery({
    queryKey: ['preferenceFoods'],
    queryFn: getPreferenceFoods,
    gcTime: 1000 * 60 * 60 * 24 * 365, 
    staleTime: 1000 * 60 * 60 * 24 * 365,
  });
};
