import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getDeleteNonPreferenceFoodPath = () => `${baseURL}/non-preferences`;

const deleteNonPreferenceFood = async (foodId: number) => {
  const response = await fetchWithToken.delete(getDeleteNonPreferenceFoodPath(), {
    data: { foodId },
  });
  return response.data;
};

export const useDeleteNonPreferenceFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNonPreferenceFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nonPreferenceFoods'] });
    },
  });
};
