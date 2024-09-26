import { useGetUserProfile } from '@/api/hooks/useGetUser';
import UserProfile from '@/components/common/User/UserProfile';

const DEFAULT_PROFILE_IMAGE = '/images/default_profile_image.png';

export default function HeaderUserIcon() {
  const { data: profileImage, status } = useGetUserProfile();

  const profile =
    status === 'pending' || status === 'error'
      ? DEFAULT_PROFILE_IMAGE
      : profileImage.profile_image_url;

  return <UserProfile profileImage={profile} />;
}
