import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

interface AvailableTime {
  startAt: string;
  endAt: string;
  timeZone: string;
  allDay: false;
}

interface GroupCalendarResponse {
  startDate: string;
  endDate: string;
  durationTime: number;
  availableTime: AvailableTime[];
}

export const getGroupCalendarPath = (meetingId: string) =>
  `${baseURL}/meeting/${meetingId}/calendar`;

export const getGroupCalendar = async (meetingId: string) => {
  const response = await fetchWithToken<GroupCalendarResponse>(getGroupCalendarPath(meetingId));
  return response.data;
};

export const useGetGroupCalendar = (meetingId: string) => {
  return useQuery({
    queryKey: ['groupCalendar', meetingId],
    queryFn: () => getGroupCalendar(meetingId),
  });
};
