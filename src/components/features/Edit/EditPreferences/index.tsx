import { useState } from 'react';

import { useGetMeetingPreferences } from '@/api/hooks/Meeting/useGetMeetingPreferences';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';

type EditPreferencesProps = {
  meetingId: string;
};

export const EditPreferences: React.FC<EditPreferencesProps> = ({ meetingId }) => {
  const { data, status } = useGetMeetingPreferences({ meetingId });
  const { meetingData, setPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: data,
    preferences: meetingData.preferences,
    setPreferences,
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
