import React, { useEffect, useState } from 'react';

import { useAddPreferenceFood } from '@/api/hooks/useAddPreferenceFood';
import { useDeletePreferenceFood } from '@/api/hooks/useDeletePreference';
import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import type { Food } from '@/types';

export const PreferenceSection: React.FC = () => {
  const { data: preferredFoods, isLoading, isError } = useGetPreferenceFoods();
  const addFoodPreference = useAddPreferenceFood();
  const deleteFoodPreference = useDeletePreferenceFood();
  const [showModal, setShowModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>(preferredFoods || []);

  useEffect(() => {
    if (preferredFoods) {
      setSelectedFoods(preferredFoods);
    }
  }, [preferredFoods]);

  const handleFoodSelect = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);

    if (isAlreadySelected) {
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.food_id !== food.food_id));
      deleteFoodPreference.mutate(food.food_id);
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      addFoodPreference.mutate(food);
    }
  };

  const handleFoodRemove = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
    deleteFoodPreference.mutate(foodId);
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
