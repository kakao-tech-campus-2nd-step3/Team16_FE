import React, { useEffect, useState } from 'react';

import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import type { Food } from '@/types';

export const JoinPreferences: React.FC = () => {
  const { data: preferenceFoods, isLoading, isError } = useGetPreferenceFoods();
  const { meetingData, setPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (preferenceFoods && meetingData.preferences.length === 0 && !isInitialized) {
      const foodIds = preferenceFoods.map((food: Food) => food.food_id);
      setSelectedFoods(preferenceFoods);
      setPreferences(foodIds);
      setIsInitialized(true);
    }
  }, [preferenceFoods, meetingData.preferences.length, isInitialized, setPreferences]);

  const handleFoodSelect = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);

    if (isAlreadySelected) {
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.food_id !== food.food_id));
      setPreferences(meetingData.preferences.filter((id) => id !== food.food_id));
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      setPreferences([...meetingData.preferences, food.food_id]);
    }
  };

  const handleFoodRemove = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
    setPreferences(meetingData.preferences.filter((id) => id !== foodId));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading preferences</p>;

  return (
    <>
      <FoodPreferenceSection
        title="선호하는 음식"
        foods={selectedFoods}
        onDeleteFood={handleFoodRemove}
        onOpenModal={() => setShowModal(true)}
      />
      {showModal && (
        <FoodSelectorModal
          selectedFoods={selectedFoods}
          onFoodSelect={handleFoodSelect}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
