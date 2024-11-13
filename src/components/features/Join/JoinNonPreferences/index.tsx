import React, { useState } from 'react';

import { useGetNonPreferenceFoods } from '@/api/hooks/useGetNonPreferenceFoods';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';

export const JoinNonPreferences: React.FC = () => {
  const { data: nonPreferenceFoods, isLoading, isError } = useGetNonPreferenceFoods();
  const { meetingData, setNonPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: nonPreferenceFoods,
    preferences: meetingData.preferences,
    setPreferences: setNonPreferences,
  });

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
