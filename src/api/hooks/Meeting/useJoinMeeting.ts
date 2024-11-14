import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { JoinMeetingRequest, JoinMeetingResponse } from '@/types';

interface JoinParams {
  meetingId: string;
  joinData: JoinMeetingRequest;
}

export const joinMeetingPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/join`;

export const joinMeeting = async ({
  meetingId,
  joinData,
}: JoinParams): Promise<JoinMeetingResponse> => {
  const response = await fetchWithToken.post(joinMeetingPath({ meetingId }), joinData);
  return response.data;
};

export const useJoinMeeting = () => {
  return useMutation<JoinMeetingResponse, Error, JoinParams>({
    mutationFn: ({ meetingId, joinData }) => joinMeeting({ meetingId, joinData }),
  });
};
