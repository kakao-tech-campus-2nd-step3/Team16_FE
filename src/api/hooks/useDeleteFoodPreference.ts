import { useMutation } from '@tanstack/react-query';

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
  return useMutation({
    mutationFn: deletePreferenceFood,
  });
};

export const useDeleteNonPreferenceFood = () => {
  return useMutation({
    mutationFn: deleteNonPreferenceFood,
  });
};
