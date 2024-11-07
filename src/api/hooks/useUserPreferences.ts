import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Food } from 'src/types';

import { fetchWithToken } from '../instance';

export const useUserPreferences = (type: 'preferred' | 'disliked') => {
  const queryClient = useQueryClient();

  const queryKey = type === 'preferred' ? ['preferredFoods'] : ['dislikedFoods'];

  // 조회 훅
  const { data: foods = [], refetch } = useQuery<Food[]>({
    queryKey,
    queryFn: async () => {
      const response = await fetchWithToken.get(`/api/${type === 'preferred' ? 'preferences' : 'non-preferences'}`);
      return response.data;
    },
  });

  // 추가 훅
  const addPreference = useMutation({
    mutationFn: (food: Food) =>
      fetchWithToken.post(`/api/${type === 'preferred' ? 'preferences' : 'non-preferences'}`, {
        food_Id: food.food_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // 삭제 훅
  const deletePreference = useMutation({
    mutationFn: (foodId: number) =>
      fetchWithToken.delete(`/api/${type === 'preferred' ? 'preferences' : 'non-preferences'}/${foodId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    foods, // 조회된 음식 목록
    addPreference: addPreference.mutate, // 선호/비선호 음식 추가 함수
    deletePreference: deletePreference.mutate, // 선호/비선호 음식 삭제 함수
    refetch, // 재조회 함수
  };
};
