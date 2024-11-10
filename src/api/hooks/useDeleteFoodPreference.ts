import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchWithToken } from '../instance';

export const useDeleteFoodPreference = (type: 'preferred' | 'disliked') => {
  const queryClient = useQueryClient();
  const queryKey = [type === 'preferred' ? 'preferredFoods' : 'dislikedFoods'];

  const deleteFood = useMutation({
    mutationFn: async (foodId: number) => {
      const response = await fetchWithToken.delete(`/api/${type === 'preferred' ? 'preferences' : 'non-preferences'}`, {
        data: { foodId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return deleteFood;
};
