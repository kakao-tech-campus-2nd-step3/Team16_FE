import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export interface ConfirmMeetingRequest {
  confirmDateTime: string;
  confirmFoodId: number;
}

interface ConfirmParams {
  meetingId: string;
  confirmRequest: ConfirmMeetingRequest;
}

export const getConfirmPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/useConfirm.ts`;

export const getConfirm = async ({ meetingId, confirmRequest }: ConfirmParams) => {
  const response = await fetchWithToken.post(getConfirmPath({ meetingId }), confirmRequest);
  return response.data;
};

export const useConfirm = () => {
  return useMutation({
    mutationFn: (params: ConfirmParams) => getConfirm(params),
  });
};
