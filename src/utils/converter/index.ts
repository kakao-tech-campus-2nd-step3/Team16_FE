import type { Meeting } from '@/api/hooks/useGetMyMeetings';

interface MeetingDataList {
  confirmedMeetings: Meeting[];
  nonConfirmedMeetings: Meeting[];
}

export const convertToMeeting = (data: Meeting[]): MeetingDataList => {
  const confirmedMeetings = data.filter((meeting) => meeting.confirmedDateTime);
  const nonConfirmedMeetings = data.filter((meeting) => !meeting.confirmedDateTime);

  return {
    confirmedMeetings,
    nonConfirmedMeetings,
  };
};
