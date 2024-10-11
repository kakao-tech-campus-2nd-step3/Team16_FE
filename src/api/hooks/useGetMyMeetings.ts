import { useQuery } from '@tanstack/react-query';

import { convertToMeeting } from '@/utils/converter';

import { fetchWithToken } from '../instance/index';

export const getMyMeetingsPath = () => `meetings`;

export interface Meeting {
  meetingId: number;
  baseLocation: {
    locationId: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  title: string;
  confirmedDateTime: string;
  confirmedFood: {
    food_id: number;
    category: string; //TODO: 강타입으로 변경
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
