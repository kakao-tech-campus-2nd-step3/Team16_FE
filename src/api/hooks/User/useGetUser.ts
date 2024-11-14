import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getUserProfilePath = () => `${baseURL}/members`;

interface UserProfile {
  member_id: number;
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
}

export const getUserProfile = async () => {
  const response = await fetchWithToken<UserProfile>(getUserProfilePath());

  return response.data;
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: [getUserProfilePath()],
    queryFn: getUserProfile,
  });
};
