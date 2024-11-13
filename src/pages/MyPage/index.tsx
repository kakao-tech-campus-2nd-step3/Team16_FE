import React from 'react';

import { NonPreferenceSection } from '@/components/features/MyPage/NonPreference';
import { PreferenceSection } from '@/components/features/MyPage/Preference';
import { ProfileSection } from '@/components/features/MyPage/ProfileSection';

export const MyPage: React.FC = () => {
  return (
    <div>
      <ProfileSection />,
      <PreferenceSection />,
      <NonPreferenceSection />
    </div>
  );
};
