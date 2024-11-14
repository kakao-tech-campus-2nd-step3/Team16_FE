import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '@/api/instance';

export const getparticipantPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/participant`;

interface Participant {
  member_id: number;
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
}

export const getParticipant = async (meetingId: string) => {
  const response = await fetchWithToken.get<Participant[]>(getparticipantPath({ meetingId }));
  return response.data;
};

export const useGetParticipant = (meetingId: string) => {
  return useQuery({
    queryKey: [getparticipantPath({ meetingId })],
    queryFn: () => getParticipant(meetingId),
    enabled: !!meetingId,
  });
};
