import { useState } from 'react';

import { useAddNonPreferenceFood } from '@/api/hooks/Food/useAddNonPreferenceFood';
import { useDeleteNonPreferenceFood } from '@/api/hooks/Food/useDeleteNonPreference';
import { useGetNonPreferenceFoods } from '@/api/hooks/Food/useGetNonPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';

export const NonPreferenceSection: React.FC = () => {
  const { data, status } = useGetNonPreferenceFoods();
  const addFoodNonPreference = useAddNonPreferenceFood();
  const deleteFoodNonPreference = useDeleteNonPreferenceFood();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: data,
    preferences: [],
    setPreferences: () => {},
    onAddFood: (food) => addFoodNonPreference.mutate(food),
    onRemoveFood: (food_id) => deleteFoodNonPreference.mutate(food_id),
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading nonPreferences</p>;

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
