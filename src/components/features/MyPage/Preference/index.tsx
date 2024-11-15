import { useState } from 'react';

import { useAddPreferenceFood } from '@/api/hooks/Food/useAddPreferenceFood';
import { useDeletePreferenceFood } from '@/api/hooks/Food/useDeletePreference';
import { useGetPreferenceFoods } from '@/api/hooks/Food/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';

export const PreferenceSection: React.FC = () => {
  const { data, status } = useGetPreferenceFoods();
  const addFoodPreference = useAddPreferenceFood();
  const deleteFoodPreference = useDeletePreferenceFood();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: data,
    preferences: [],
    setPreferences: () => {},
    onAddFood: (food) => addFoodPreference.mutate(food),
    onRemoveFood: (food_id) => deleteFoodPreference.mutate(food_id),
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading preferences</p>;

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
