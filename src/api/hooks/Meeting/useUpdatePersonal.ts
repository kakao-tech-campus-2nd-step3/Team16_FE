import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { JoinMeetingRequest, JoinMeetingResponse } from '@/types';

export const getUpdatePersonalPath = (meetingId: string) =>
  `${baseURL}/meeting/${meetingId}/personal`;

export const updatePersonal = async (
  meetingId: string,
  updateData: JoinMeetingRequest,
): Promise<JoinMeetingResponse> => {
  const response = await fetchWithToken.put<JoinMeetingResponse>(
    getUpdatePersonalPath(meetingId),
    updateData,
  );
  return response.data;
};

export const useUpdatePersonal = (meetingId: string) => {
  return useMutation({
    mutationFn: (updateData: JoinMeetingRequest) => updatePersonal(meetingId, updateData),
  });
};
