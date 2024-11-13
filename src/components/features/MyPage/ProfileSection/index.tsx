import styled from '@emotion/styled';

import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { UserProfileImage } from '@/components/common/User/UserProfileImage';

export const ProfileSection: React.FC = () => {
  const { data, status } = useGetUserProfile();

  if (status === 'pending') {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (status === 'error' || !data) {
    return <ErrorMessage>프로필 정보를 불러오는 데 실패했습니다.</ErrorMessage>;
  }

  return (
    <ProfileContainer>
      <UserProfileImage profileImageUrl={data.profile_image_url} size="lg" />
      <ProfileName>{data.nickname}</ProfileName>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileName = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.8rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: red;
  margin-top: 2rem;
`;
