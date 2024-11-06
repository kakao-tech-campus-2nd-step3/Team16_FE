import React from 'react';

import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { UserProfileImage } from '@/components/common/User/UserProfileImage';

const DEFAULT_PROFILE_IMAGE = '/images/default_profile_image.png';

type Props = {
  onClick?: () => void;
};

export const HeaderUserIcon: React.FC<Props> = ({ onClick }) => {
  const { data: profileImage, status } = useGetUserProfile();

  const profile =
    status === 'pending' || status === 'error'
      ? DEFAULT_PROFILE_IMAGE
      : profileImage.profile_image_url;

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <UserProfileImage profileImageUrl={profile} size="sm" />
    </div>
  );
};
