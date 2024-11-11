import React, { useEffect } from 'react';

import { useAddPreferenceFood } from '@/api/hooks/useAddPreferenceFood'
import { useDeletePreferenceFood } from '@/api/hooks/useDeletePreference'
import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import type { Food } from '@/types';

export const PreferenceSection: React.FC = () => {
  const { data: preferredFoods, isLoading, isError, refetch } = useGetPreferenceFoods();
  const addFoodPreference = useAddPreferenceFood();
  const deleteFoodPreference = useDeletePreferenceFood();

  const handleAddFood = (food: Food) => addFoodPreference.mutate(food);
  const handleDeleteFood = (foodId: number) => deleteFoodPreference.mutate(foodId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading preferences</p>;

  return (
    <FoodPreferenceSection
      title="선호하는 음식"
      foods={preferredFoods || []}
      onAddFood={handleAddFood}
      onDeleteFood={handleDeleteFood}
      refetchFoods={refetch}
    />
  );
};
