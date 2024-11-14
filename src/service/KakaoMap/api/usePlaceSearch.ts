import { useQuery } from '@tanstack/react-query';

import { kakaoAPI, kakaoBaseURL } from '@/api/instance';

export const getPlaceSearchPath = ({ keyword }: { keyword: string }) =>
  `${kakaoBaseURL}/v2/local/search/keyword.json?query=${keyword}`;

export const placeSearch = async ({ keyword }: { keyword: string }) => {
  const response = await kakaoAPI.get(getPlaceSearchPath({ keyword }));
  return response.data;
};

export const usePlaceSearch = (address: string | null) => {
  return useQuery({
    queryKey: ['placeSearch', address],
    queryFn: () => placeSearch({ keyword: address as string }),
    enabled: !!address,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
