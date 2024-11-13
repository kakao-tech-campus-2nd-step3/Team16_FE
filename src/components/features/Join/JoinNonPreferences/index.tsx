import React, { useEffect } from 'react';

import { useGetNonPreferenceFoods } from '@/api/hooks/useGetNonPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import type { Food } from '@/types';

export const JoinNonPreferences: React.FC = () => {
  const { data: nonPreferenceFoods, status, refetch } = useGetNonPreferenceFoods();
  const { meetingData, setNonPreferences } = useJoinFormContext();

  useEffect(() => {
    if (nonPreferenceFoods) {
      const foodIds = nonPreferenceFoods.map((food: Food) => food.food_id);
      setNonPreferences(foodIds);
    }
  }, [nonPreferenceFoods, setNonPreferences]);

  const handleAddFood = (food: Food) => {
    setNonPreferences([...meetingData.nonPreferences, food.food_id]);
  };

  const handleDeleteFood = (foodId: number) => {
    setNonPreferences(meetingData.nonPreferences.filter((id) => id !== foodId));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error...</p>;

  return (
    <FoodPreferenceSection
      title="선호하는 음식"
      foods={nonPreferenceFoods || []}
      onAddFood={handleAddFood}
      onDeleteFood={handleDeleteFood}
      refetchFoods={refetch}
    />
  );
};
