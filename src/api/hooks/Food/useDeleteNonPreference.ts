import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getDeleteNonPreferenceFoodPath = () => `${baseURL}/non-preferences`;

const deleteNonPreferenceFood = async (food_id: number) => {
  const response = await fetchWithToken.delete(getDeleteNonPreferenceFoodPath(), {
    data: { food_id },
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
