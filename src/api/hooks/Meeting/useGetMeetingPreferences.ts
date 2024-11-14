import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

type MeetingId = {
  meetingId: string;
};

export const getMeetingPreferencesPath = ({ meetingId }: MeetingId) =>
  `${baseURL}/meeting/${meetingId}/preferences`;

export const getMeetingPreferences = async ({ meetingId }: MeetingId) => {
  const response = await fetchWithToken.get(getMeetingPreferencesPath({ meetingId }));
  return response.data;
};

export const useGetMeetingPreferences = ({ meetingId }: MeetingId) => {
  return useQuery({
    queryKey: ['meetingPerferences', meetingId],
    queryFn: () => getMeetingPreferences({ meetingId }),
    enabled: !!meetingId,
  });
};
