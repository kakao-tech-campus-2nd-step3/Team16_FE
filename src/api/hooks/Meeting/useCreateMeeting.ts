import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';
import type { CreateMeetingRequest, CreateMeetingResponse } from '@/types';

export const createMeetingPath = () => `${baseURL}/meeting/`;

export const createMeeting = async (meetingData: CreateMeetingRequest) => {
  const response = await fetchWithToken<CreateMeetingResponse>(createMeetingPath(), {
    method: 'POST',
    data: meetingData,
  });
  return response.data;
};

export const useCreateMeeting = () => {
  return useMutation({
    mutationFn: createMeeting,
  });
};
