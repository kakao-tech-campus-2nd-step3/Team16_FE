import { useQuery } from '@tanstack/react-query';

import type { Food } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const getFoodsByCategoryPath = (category: string) => `${baseURL}/foods?category=${category}`;

const getFoodsByCategory = async (category: string): Promise<Food[]> => {
  if (!category || category === 'undefined') {
    throw new Error("Invalid category");
  }
  const response = await fetchWithToken.get(getFoodsByCategoryPath(category));
  return response.data.data || [];
};

export const useGetFoodsByCategory = (category: string | undefined) => {
  return useQuery<Food[]>({
    queryKey: ['foods', category],
    queryFn: () => getFoodsByCategory(category!),
    enabled: !!category && category !== 'undefined',
    staleTime: 1000 * 60 * 60,
  });
};