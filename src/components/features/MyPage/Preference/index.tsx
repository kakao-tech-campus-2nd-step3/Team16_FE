import React, { useState } from 'react';

import { useAddPreferenceFood } from '@/api/hooks/useAddPreferenceFood';
import { useDeletePreferenceFood } from '@/api/hooks/useDeletePreference';
import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';

export const PreferenceSection: React.FC = () => {
  const { data: preferredFoods, isLoading, isError } = useGetPreferenceFoods();
  const addFoodPreference = useAddPreferenceFood();
  const deleteFoodPreference = useDeletePreferenceFood();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: preferredFoods,
    preferences: [],
    setPreferences: () => {},
    onAddFood: (food) => addFoodPreference.mutate(food),
    onRemoveFood: (foodId) => deleteFoodPreference.mutate(foodId),
  });

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
