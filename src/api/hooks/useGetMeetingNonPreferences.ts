import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export const getMeetingNonPreferencesPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/non-preferences`;

export const getMeetingNonPreferences = async (meetingId: string) => {
  const response = await fetchWithToken.get(getMeetingNonPreferencesPath({ meetingId }));
  return response.data;
};

export const useGetMeetingNonPreferences = (meetingId: string) => {
  return useQuery({
    queryKey: ['meetingNonPerferences', meetingId],
    queryFn: () => getMeetingNonPreferences(meetingId),
    enabled: !!meetingId,
  });
};
