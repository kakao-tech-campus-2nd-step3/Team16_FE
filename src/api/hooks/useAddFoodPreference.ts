import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchWithToken } from '@/api/instance';
import type { Food } from '@/types';

interface UseAddFoodPreferenceProps {
  type: 'preferred' | 'disliked';
}

export const useAddFoodPreference = ({ type }: UseAddFoodPreferenceProps) => {
  const queryClient = useQueryClient();
  const queryKey = type === 'preferred' ? ['preferredFoods'] : ['dislikedFoods'];

  const addFoodPreference = useMutation({
    mutationFn: async (food: Food) => {
      const response = await fetchWithToken.post(`/api/${type === 'preferred' ? 'preferences' : 'non-preferences'}`, {
        foodId: food.food_id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return addFoodPreference;
};
