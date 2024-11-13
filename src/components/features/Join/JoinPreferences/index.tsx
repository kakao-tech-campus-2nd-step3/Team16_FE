import React, { useState } from 'react';

import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';

export const JoinPreferences: React.FC = () => {
  const { data: preferenceFoods, isLoading, isError } = useGetPreferenceFoods();
  const { meetingData, setPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: preferenceFoods,
    preferences: meetingData.preferences,
    setPreferences,
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
