import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { UserProfileImage } from '@/components/common/User/UserProfileImage';

const DEFAULT_PROFILE_IMAGE = '/images/default_profile_image.png';

export const HeaderUserIcon = () => {
  const { data: profileImage, status } = useGetUserProfile();

  const profile =
    status === 'pending' || status === 'error'
      ? DEFAULT_PROFILE_IMAGE
      : profileImage.profile_image_url;

  return <UserProfileImage profileImageUrl={profile} />;
};