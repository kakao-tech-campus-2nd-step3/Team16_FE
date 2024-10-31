import { useQuery } from '@tanstack/react-query';

import type { MeetingInfo } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const getMeetingInfoPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}`;

export const getMeetingInfo = async (meetingId: string) => {
  const response = await fetchWithToken.get<MeetingInfo>(getMeetingInfoPath({ meetingId }));
  return response.data;
};

export const useGetMeetingInfo = (meetingId: string) => {
  return useQuery({
    queryKey: ['meetingInfo', meetingId],
    queryFn: () => getMeetingInfo(meetingId),
    enabled: !!meetingId,
  });
};
