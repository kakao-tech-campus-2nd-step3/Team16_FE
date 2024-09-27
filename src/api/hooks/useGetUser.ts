import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance/index';

//TODO: path만 따로 관리
export const getUserProfilePath = () => `members`;

interface UserProfile {
  member_id: number;
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
}

export const getUserProfile = async () => {
  const response = await fetchInstance<UserProfile>(getUserProfilePath());
  return response.data;
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [getUserProfilePath()],
    queryFn: getUserProfile,
  });
};
