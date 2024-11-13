import React, { useEffect } from 'react';

import { useAddNonPreferenceFood } from '@/api/hooks/useAddNonPreferenceFood';
import { useDeleteNonPreferenceFood } from '@/api/hooks/useDeleteNonPreference';
import { useGetNonPreferenceFoods } from '@/api/hooks/useGetNonPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import type { Food } from '@/types';

export const NonPreferenceSection: React.FC = () => {
  const { data: nonPreferredFoods, isLoading, isError, refetch } = useGetNonPreferenceFoods();
  const addNonPreferenceFood = useAddNonPreferenceFood();
  const deleteNonPreferenceFood = useDeleteNonPreferenceFood();

  const handleAddFood = (food: Food) => addNonPreferenceFood.mutate(food);
  const handleDeleteFood = (foodId: number) => deleteNonPreferenceFood.mutate(foodId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading non-preferences</p>;

  return (
    <FoodPreferenceSection
      title="꺼려하는 음식"
      foods={nonPreferredFoods || []}
      onAddFood={handleAddFood}
      onDeleteFood={handleDeleteFood}
      refetchFoods={refetch}
    />
  );
};
