import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

interface Permission {
  isHost: boolean;
}

export const getPermissionPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/is-host`;

export const getPermission = async (meetingId: string) => {
  const response = await fetchWithToken.get<Permission>(getPermissionPath({ meetingId }));
  return response.data;
};

export const useGetPermission = (meetingId: string) => {
  return useQuery({
    queryKey: ['permission', meetingId],
    queryFn: () => getPermission(meetingId),
    enabled: !!meetingId,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};
