import React, { useEffect, useState } from 'react';

import { useGetNonPreferenceFoods } from '@/api/hooks/useGetNonPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';
import type { Food } from '@/types';

export const JoinNonPreferences: React.FC = () => {
  const { data: nonPreferenceFoods, isLoading, isError } = useGetNonPreferenceFoods();
  const { meetingData, setNonPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (nonPreferenceFoods && meetingData.nonPreferences.length === 0 && !isInitialized) {
      const foodIds = nonPreferenceFoods.map((food: Food) => food.food_id);
      setSelectedFoods(nonPreferenceFoods);
      setNonPreferences(foodIds);
      setIsInitialized(true);
    }
  }, [nonPreferenceFoods, meetingData.nonPreferences.length, isInitialized, setNonPreferences]);

  const handleFoodSelect = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);

    if (isAlreadySelected) {
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.food_id !== food.food_id));
      setNonPreferences(meetingData.nonPreferences.filter((id) => id !== food.food_id));
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      setNonPreferences([...meetingData.nonPreferences, food.food_id]);
    }
  };

  const handleFoodRemove = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
    setNonPreferences(meetingData.nonPreferences.filter((id) => id !== foodId));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading preferences</p>;

  return (
    <>
      <FoodPreferenceSection
        title="꺼려하는 음식"
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
