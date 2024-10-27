import { useQuery } from '@tanstack/react-query';

import type { menuCategories } from '@/components/common/Menu/MenuCatoery';

import { baseURL, fetchWithToken } from '../instance';

export interface Food {
  food_id: number;
  category: (typeof menuCategories)[number];
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
