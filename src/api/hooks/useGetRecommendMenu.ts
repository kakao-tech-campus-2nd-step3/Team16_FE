import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export interface Food {
  food_id: number;
  category: string;
  name: string;
}

export const getRecommandMenuPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/recommend`;

export const getRecommandMeny = async (meetingId: string) => {
  const response = await fetchWithToken.get<Food[]>(getRecommandMenuPath({ meetingId }));
  return response.data;
};

export const useGetRecommandMenu = (meetingId: string) => {
  return useQuery({
    queryKey: [getRecommandMenuPath({ meetingId })],
    queryFn: () => getRecommandMeny(meetingId),
    enabled: !!meetingId,
  });
};
