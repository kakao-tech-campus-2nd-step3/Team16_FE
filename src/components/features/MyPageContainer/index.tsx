import React from 'react';
import MyPage from 'src/pages/MyPage';

import { useGetUserProfile } from '@/api/hooks/useGetUser';

export const MyPageContainer: React.FC = () => {
  const { data: profileData, status } = useGetUserProfile();

  if (status === 'pending') {
    return <div>로딩 중...</div>;
  }

  if (status === 'error' || !profileData) {
    return <div>프로필 정보를 불러오는 데 실패했습니다.</div>;
  }

  // MyPage로 profileData를 전달
  return (
    <MyPage
      profileData={{
        profileImageUrl: profileData.profile_image_url, // 실제 프로필 데이터 필드 이름에 맞게 매핑
        nickname: profileData.nickname,
      }}
    />
  );
};

export default MyPageContainer;
