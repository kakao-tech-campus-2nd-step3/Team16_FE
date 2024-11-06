import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { UserProfileImage } from '@/components/common/User/UserProfileImage';

const DEFAULT_PROFILE_IMAGE = '/images/default_profile_image.png';

type Props = {
  onClick?: () => void;
};

export const HeaderUserIcon: React.FC<Props> = ({ onClick }) => {
  const navigate = useNavigate();
  const { data: profileImage, status } = useGetUserProfile();

  const profile =
    status === 'pending' || status === 'error'
      ? DEFAULT_PROFILE_IMAGE
      : profileImage.profile_image_url;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/mypage');
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <UserProfileImage profileImageUrl={profile} size="sm" />
    </div>
  );
};
