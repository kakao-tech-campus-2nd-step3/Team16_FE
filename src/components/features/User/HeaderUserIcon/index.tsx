import { useGetUserProfile } from '@/api/hooks/useGetUser';
import UserProfile from '@/components/common/User/UserProfile';

export default function HeaderUserIcon() {
  const { data: profileImage, status } = useGetUserProfile();

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  const { profile_image_url: profile } = profileImage;

  return <UserProfile profileImage={profile} />;
}
