import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { Food } from '@/types';

export const getAddPreferenceFoodPath = () => `${baseURL}/preferences`;
export const getAddNonPreferenceFoodPath = () => `${baseURL}/non-preferences`;

const addPreferenceFood = async (food: Food) => {
  const response = await fetchWithToken.post(getAddPreferenceFoodPath(), {
    foodId: food.food_id,
  });
  return response.data;
};

const addNonPreferenceFood = async (food: Food) => {
  const response = await fetchWithToken.post(getAddNonPreferenceFoodPath(), {
    foodId: food.food_id,
  });
  return response.data;
};

export const useAddPreferenceFood = () => {
  return useMutation({
    mutationFn: addPreferenceFood,
  });
};

export const useAddNonPreferenceFood = () => {
  return useMutation({
    mutationFn: addNonPreferenceFood,
  });
};
