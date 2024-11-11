import { useMutation, useQueryClient } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export const getDeletePreferenceFoodPath = () => `${baseURL}/preferences`;
export const getDeleteNonPreferenceFoodPath = () => `${baseURL}/non-preferences`;

const deletePreferenceFood = async (foodId: number) => {
  const response = await fetchWithToken.delete(getDeletePreferenceFoodPath(), {
    data: { foodId },
  });
  return response.data;
};

const deleteNonPreferenceFood = async (foodId: number) => {
  const response = await fetchWithToken.delete(getDeleteNonPreferenceFoodPath(), {
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

export const useDeleteNonPreferenceFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNonPreferenceFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nonPreferenceFoods'] });
    },
  });
};
