import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

type MeetingId = {
  meetingId: string;
};

export const getMeetingNonPreferencesPath = ({ meetingId }: MeetingId) =>
  `${baseURL}/meeting/${meetingId}/non-preferences`;

export const getMeetingNonPreferences = async ({ meetingId }: MeetingId) => {
  const response = await fetchWithToken.get(getMeetingNonPreferencesPath({ meetingId }));
  return response.data;
};

export const useGetMeetingNonPreferences = ({ meetingId }: MeetingId) => {
  return useQuery({
    queryKey: ['meetingNonPerferences', meetingId],
    queryFn: () => getMeetingNonPreferences({ meetingId }),
    enabled: !!meetingId,
  });
};
