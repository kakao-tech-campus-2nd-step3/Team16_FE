import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getNonPreferencePath = () => `${baseURL}/non-preferences`; 

export const getNonPreferenceFoods = async () => {
  const response = await fetchWithToken.get(getNonPreferencePath()); 
  return response.data.data || [];
};

export const useGetNonPreferenceFoods = () => {
  return useQuery({
    queryKey: ['nonPreferenceFoods'],
    queryFn: getNonPreferenceFoods,
    staleTime: 1000 * 60 * 60 * 24, 
  });
};
