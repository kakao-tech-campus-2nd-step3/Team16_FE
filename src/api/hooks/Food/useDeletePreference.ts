import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getDeletePreferenceFoodPath = () => `${baseURL}/preferences`;

const deletePreferenceFood = async (food_id: number) => {
  const response = await fetchWithToken.delete(getDeletePreferenceFoodPath(), {
    data: { food_id },
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
