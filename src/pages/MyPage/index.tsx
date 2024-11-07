import styled from '@emotion/styled';
import React from 'react';

import { UserProfileImage } from '@/components/common/User/UserProfileImage';

interface ProfileData {
  profile_image_url: string;
  nickname: string;
}

interface MyPageProps {
  profileData?: ProfileData;
}

export const MyPage: React.FC<MyPageProps> = ({ profileData }) => (
  <ProfileContainer>
    <UserProfileImage profileImageUrl={profileData?.profile_image_url || '/images/default_profile_image.png'} size="lg" />
    <ProfileName>{profileData?.nickname || '쿠키즈'}</ProfileName>
  </ProfileContainer>
);

export default MyPage;

// 스타일링 컴포넌트
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
