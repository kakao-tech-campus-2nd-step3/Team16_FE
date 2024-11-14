import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { PersonalResponse } from '@/types';

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
