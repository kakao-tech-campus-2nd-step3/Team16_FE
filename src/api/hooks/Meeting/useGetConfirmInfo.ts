import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

interface ConfirmInfo {
  confirmedDateTime: 'string';
  confirmedFood: {
    foodId: number;
    category: string;
    name: string;
  };
  baseLocation: {
    locationId: number;
    address: string;
    latitude: number;
    longitude: number;
  };
}

export const getConfirmInfoPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/confirmed-info`;

export const getConfirmInfo = async ({ meetingId }: { meetingId: string }) => {
  const response = await fetchWithToken.get<ConfirmInfo | null>(getConfirmInfoPath({ meetingId }));
  return response.data;
};

export const useGetConfirmInfo = ({ meetingId }: { meetingId: string }) => {
  return useQuery({
    queryKey: ['confirmInfo', meetingId],
    queryFn: () => getConfirmInfo({ meetingId }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });
};
