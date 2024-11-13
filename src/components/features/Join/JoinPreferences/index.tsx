import React, { useEffect } from 'react';

import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import type { Food } from '@/types';

export const JoinPreferences: React.FC = () => {
  const { data: preferenceFoods, status, refetch } = useGetPreferenceFoods();
  const { meetingData, setPreferences } = useJoinFormContext();

  useEffect(() => {
    if (preferenceFoods) {
      const foodIds = preferenceFoods.map((food: Food) => food.food_id);

      if (JSON.stringify(meetingData.preferences) !== JSON.stringify(foodIds)) {
        setPreferences(foodIds);
      }
    }
  }, [preferenceFoods, meetingData, setPreferences]);

  const handleAddFood = (food: Food) => {
    setPreferences([...meetingData.preferences, food.food_id]);
  };

  const handleDeleteFood = (foodId: number) => {
    setPreferences(meetingData.preferences.filter((id) => id !== foodId));
  };

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error...</p>;

  return (
    <FoodPreferenceSection
      title="선호하는 음식"
      foods={preferenceFoods || []}
      onAddFood={handleAddFood}
      onDeleteFood={handleDeleteFood}
      refetchFoods={refetch}
    />
  );
};
