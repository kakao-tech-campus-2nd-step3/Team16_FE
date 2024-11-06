import React from 'react';

import { UserProfileImage } from '@/components/common/User/UserProfileImage';

const DEFAULT_PROFILE_IMAGE = '/images/default_profile_image.png';

type Props = {
  profileImageUrl?: string;
  onClick?: () => void;
};

export const HeaderUserIcon: React.FC<Props> = ({ profileImageUrl, onClick }) => {
  const profile = profileImageUrl || DEFAULT_PROFILE_IMAGE;

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <UserProfileImage profileImageUrl={profile} size="sm" />
    </div>
  );
};
