// src/pages/MyPage/index.tsx
import styled from '@emotion/styled';
import React from 'react';

import { useUserPreferences } from '@/api/hooks/useUserPreferences';
import { UserProfileImage } from '@/components/common/User/UserProfileImage';
import { FoodSelector } from '@/components/features/Food/FoodSelector';

interface ProfileData {
  profileImageUrl: string;
  nickname: string;
}

export const MyPage: React.FC<{ profileData: ProfileData }> = ({ profileData }) => {
  const { foods: preferredFoods, addPreference: addPreferredFood, deletePreference: deletePreferredFood } = useUserPreferences('preferred');
  const { foods: dislikedFoods, addPreference: addDislikedFood, deletePreference: deleteDislikedFood } = useUserPreferences('disliked');

  return (
    <ProfileContainer>
      <UserProfileImage profileImageUrl={profileData.profileImageUrl} size="lg" />
      <ProfileName>{profileData.nickname}</ProfileName>

      {/* 선호하는 음식 섹션 */}
      <SectionTitle>선호하는 음식</SectionTitle>
      <FoodSelector initialFoods={preferredFoods} type="preferred" onAddFood={addPreferredFood} onDeleteFood={deletePreferredFood} />

      {/* 꺼려하는 음식 섹션 */}
      <SectionTitle>꺼려하는 음식</SectionTitle>
      <FoodSelector initialFoods={dislikedFoods} type="disliked" onAddFood={addDislikedFood} onDeleteFood={deleteDislikedFood} />
    </ProfileContainer>
  );
};

export default MyPage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 4rem);
  justify-content: flex-start;
  padding-top: 2rem;
  text-align: center;
`;

const ProfileName = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.8rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-top: 20px;
  color: #333;
`;
