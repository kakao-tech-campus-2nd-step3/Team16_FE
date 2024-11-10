import { useMutation } from '@tanstack/react-query';

import type { JoinMeetingRequest, JoinMeetingResponse } from '@/types';

import { fetchWithToken } from '../instance';

export const getUpdatePersonalPath = (meetingId: string) => `/meeting/${meetingId}/personal`;

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
