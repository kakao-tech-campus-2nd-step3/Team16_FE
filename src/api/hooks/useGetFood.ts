import { useQuery } from '@tanstack/react-query';

import type { Food } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const getFoodsByCategoryPath = (category: string = '') => `${baseURL}/foods?category=${category}`;

const getFoodsByCategory = async (category: string): Promise<Food[]> => {
  if (!category || category === 'undefined') {
    throw new Error("Invalid category");
  }
  const response = await fetchWithToken.get(getFoodsByCategoryPath(category));
  return response.data || [];
};

export const useGetFoodsByCategory = (category: string | undefined, options?: { enabled: boolean }) => {
  return useQuery<Food[]>({
    queryKey: ['foods', category],
    queryFn: () => getFoodsByCategory(category!),
    enabled: options?.enabled ?? !!category,
    staleTime: 1000 * 60 * 60,
  });
};