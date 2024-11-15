import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import { convertToMeeting } from '@/utils/converter';

export const getMyMeetingsPath = () => `${baseURL}/meeting`;

export interface Meeting {
  meetingId: number;
  baseLocation: {
    locationId: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  title: string;
  confirmedDateTime?: string | null;
  confirmedFood: {
    foodId: number;
    category: string;
    name: string;
  };
}

export const getMyMeeting = async () => {
  const response = await fetchWithToken<Meeting[]>(getMyMeetingsPath());
  return response.data;
};

export const useGetMyMeeting = () => {
  return useQuery({
    queryKey: [getMyMeetingsPath()],
    queryFn: getMyMeeting,
    select: (data) => convertToMeeting(data),
  });
};
