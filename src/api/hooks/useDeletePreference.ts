import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export const getDeletePreferenceFoodPath = () => `${baseURL}/preferences`;

const deletePreferenceFood = async (foodId: number) => {
  const response = await fetchWithToken.delete(getDeletePreferenceFoodPath(), {
    data: { foodId },
  });
  return response.data;
};

export const useDeletePreferenceFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePreferenceFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferenceFoods'] });
    },
  });
};
