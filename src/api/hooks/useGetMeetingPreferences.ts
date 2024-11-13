import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export const getMeetingPreferencesPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/preferences`;

export const getMeetingPreferences = async (meetingId: string) => {
  const response = await fetchWithToken.get(getMeetingPreferencesPath({ meetingId }));
  return response.data;
};

export const useGetMeetingPreferences = (meetingId: string) => {
  return useQuery({
    queryKey: ['meetingPerferences', meetingId],
    queryFn: () => getMeetingPreferences(meetingId),
    enabled: !!meetingId,
  });
};
