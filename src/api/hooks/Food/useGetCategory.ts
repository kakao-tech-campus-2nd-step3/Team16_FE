import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getCategoryPath = () => `${baseURL}/food-categories`;

export const getCategor = async () => {
  const response = await fetchWithToken.get<string[]>(getCategoryPath());
  return response.data;
};

export const useGetCategory = () => {
  return useQuery({
    queryKey: [getCategoryPath()],
    queryFn: getCategor,
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
