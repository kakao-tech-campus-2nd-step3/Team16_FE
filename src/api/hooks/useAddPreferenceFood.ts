import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { Food } from '@/types';

export const getAddPreferenceFoodPath = () => `${baseURL}/preferences`;

const addPreferenceFood = async (food: Food) => {
  const response = await fetchWithToken.post(getAddPreferenceFoodPath(), {
    foodId: food.food_id,
  });
  return response.data;
};

export const useAddPreferenceFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPreferenceFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferenceFoods'] });

    },
  });
};
