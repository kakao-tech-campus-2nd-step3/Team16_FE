import { useQuery } from '@tanstack/react-query';

import type { PersonalResponse } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const getPersonalPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/personal-event`;

export const getPersonalEvents = async (meetingId: string): Promise<PersonalResponse> => {
  const response = await fetchWithToken.get(getPersonalPath({ meetingId }));
  return response.data;
};

export const useGetPersonalEvents = (meetingId: string) => {
  return useQuery({
    queryKey: [getPersonalPath({ meetingId })],
    queryFn: () => getPersonalEvents(meetingId),
    enabled: !!meetingId,
  });
};
