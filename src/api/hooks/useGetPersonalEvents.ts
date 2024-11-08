import { useQuery } from '@tanstack/react-query';

import type { PersonalEvent, PersonalEventsResponse } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const getPersonalPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/personal-event`;

export const getPersonalEvents = async (meetingId: string): Promise<PersonalEvent[]> => {
  const response = await fetchWithToken.get<PersonalEventsResponse>(getPersonalPath({ meetingId }));

  return response.data.data.meeting_personal_times.map((time) => ({
    startAt: time.start_at,
    endAt: time.end_at,
    timeZone: time.time_zone,
    allDay: time.all_day,
  }));
};

export const useGetPersonalEvents = (meetingId: string) => {
  return useQuery({
    queryKey: [getPersonalPath({ meetingId })],
    queryFn: () => getPersonalEvents(meetingId),
    enabled: !!meetingId,
  });
};
