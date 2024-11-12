import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getNonPreferencePath = () => `${baseURL}/non-preferences`; 

export const getNonPreferenceFoods = async () => {
  const response = await fetchWithToken.get(getNonPreferencePath()); 
  return response.data || [];
};

export const useGetNonPreferenceFoods = () => {
  return useQuery({
    queryKey: ['nonpreferenceFoods'],
    queryFn: getNonPreferenceFoods,
    gcTime: 1000 * 60 * 60 * 24 * 365,
    staleTime: 1000 * 60 * 60 * 24 * 365,
  });
};
