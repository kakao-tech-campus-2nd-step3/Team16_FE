import { useMutation } from '@tanstack/react-query';

import { fetchWithToken } from '../instance/index';

export const createMeetingPath = () => `/api/meeting`;

interface CreateMeetingRequest {
  title: string;
  startDate: string;
  endDate: string;
  durationTime: number;
  startTime: string;
  endTime: string;
}

interface CreateMeetingResponse {
  status: number;
  message: string;
  data: null;
}

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
