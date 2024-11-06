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

  return <MyPage profileData={profileData} />;
};

export default MyPageContainer;
