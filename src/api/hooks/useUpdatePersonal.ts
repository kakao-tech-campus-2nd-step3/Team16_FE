import { useMutation } from '@tanstack/react-query';

import type { JoinMeetingRequest, JoinMeetingResponse } from '@/types';

import { baseURL, fetchWithToken } from '../instance';

export const updatePersonalPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/personal`;

export const updatePersonal = async ({
  meetingId,
  personalData,
}: {
  meetingId: string;
  personalData: JoinMeetingRequest;
}): Promise<JoinMeetingResponse> => {
  const response = await fetchWithToken.put<JoinMeetingResponse>(
    updatePersonalPath({ meetingId }),
    {
      method: 'PUT',
      data: personalData,
    },
  );
  return response.data;
};

export const useUpdatePersonal = () => {
  return useMutation<
    JoinMeetingResponse,
    Error,
    { meetingId: string; personalData: JoinMeetingRequest }
  >({
    mutationFn: ({ meetingId, personalData }) => updatePersonal({ meetingId, personalData }),
  });
};
