import React, { useEffect, useState } from 'react';

import { useAddNonPreferenceFood } from '@/api/hooks/useAddNonPreferenceFood';
import { useDeleteNonPreferenceFood } from '@/api/hooks/useDeleteNonPreference';
import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import type { Food } from '@/types';

export const NonPreferenceSection: React.FC = () => {
  const { data: preferredFoods, isLoading, isError } = useGetPreferenceFoods();
  const addFoodNonPreference = useAddNonPreferenceFood();
  const deleteFoodNonPreference = useDeleteNonPreferenceFood();
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
      deleteFoodNonPreference.mutate(food.food_id);
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      addFoodNonPreference.mutate(food);
    }
  };

  const handleFoodRemove = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
    deleteFoodNonPreference.mutate(foodId);
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
