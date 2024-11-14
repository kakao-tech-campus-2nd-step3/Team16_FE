import { useMutation } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

interface LeaveGroupParams {
  meetingId: string;
}

export const getLeaveGroupPath = ({ meetingId }: LeaveGroupParams) =>
  `${baseURL}/meeting/${meetingId}`;

export const deleteLeaveGroup = async ({ meetingId }: LeaveGroupParams) => {
  const response = await fetchWithToken.delete(getLeaveGroupPath({ meetingId }));
  return response;
};

export const useLeaveGroup = () => {
  return useMutation({
    mutationFn: deleteLeaveGroup,
  });
};
