import { useQuery } from '@tanstack/react-query';

import type { PlaceInfo } from '@/types';

import { kakaoAPI } from '../instance';

export const getPlaceSearchPath = ({ keyword }: { keyword: string }) =>
  `/v2/local/search/keyword.json?query=${keyword}`;

export const placeSearch = async ({ keyword }: { keyword: string }): Promise<PlaceInfo | null> => {
  const response = await kakaoAPI.get(getPlaceSearchPath({ keyword }));
  const data = response.data;

  if (data.documents && data.documents.length > 0) {
    const place = data.documents[0];
    return {
      location_id: place.id,
      name: place.place_name,
      address: place.road_address_name || place.address_name,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    };
  }

  return null;
};

export const usePlaceSearch = (address: string | null): PlaceInfo | null => {
  const { data: placeInfo } = useQuery<PlaceInfo | null>({
    queryKey: ['placeSearch', address],
    queryFn: () => placeSearch({ keyword: address as string }),
    enabled: !!address,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return placeInfo ?? null;
};
