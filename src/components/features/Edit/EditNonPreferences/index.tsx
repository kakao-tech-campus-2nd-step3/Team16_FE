import { useState } from 'react';

import { useGetMeetingNonPreferences } from '@/api/hooks/Meeting/useGetMeetingNonPreferences';
import { FoodPreferenceSection } from '@/components/common/Food/FoodPreferenceSection';
import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { useFoodPreferences } from '@/hooks/useFoodPreferences';
import { useJoinFormContext } from '@/hooks/useJoinFormContext';

type EditPreferencesProps = {
  meetingId: string;
};

export const EditNonPreferences: React.FC<EditPreferencesProps> = ({ meetingId }) => {
  const { data, status } = useGetMeetingNonPreferences({ meetingId });
  const { meetingData, setNonPreferences } = useJoinFormContext();
  const [showModal, setShowModal] = useState(false);

  const { selectedFoods, handleFoodSelect, handleFoodRemove } = useFoodPreferences({
    initialFoods: data,
    preferences: meetingData.nonPreferences,
    setPreferences: setNonPreferences,
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading NonPreferences</p>;

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
