import { useQuery } from '@tanstack/react-query';

import { baseURL, fetchWithToken } from '../instance';

export interface Food {
  food_id: number;
  category: string;
  name: string;
}

export const getRecommendMenuPath = ({ meetingId }: { meetingId: string }) =>
  `${baseURL}/meeting/${meetingId}/recommend`;

export const getRecommendMenu = async (meetingId: string) => {
  const response = await fetchWithToken.get<Food[]>(getRecommendMenuPath({ meetingId }));
  return response.data;
};

export const useGetRecommendMenu = (meetingId: string) => {
  return useQuery({
    queryKey: [getRecommendMenuPath({ meetingId })],
    queryFn: () => getRecommendMenu(meetingId),
    enabled: !!meetingId,
  });
};
