import { useEffect, useState } from 'react';

import type { PlaceInfo } from './types';

const KAKAO_API_KEY = 'fe995452b0e63ba6e5276669fad15c21';

export const usePlaceSearch = (address: string | null): PlaceInfo | null => {
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);

  useEffect(() => {
    if (!address) return;

    const searchPlaceByKeyword = async (keyword: string) => {
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      });

      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const place = data.documents[0];
        setPlaceInfo({
          location_id: place.id,
          name: place.place_name,
          address: place.road_address_name || place.address_name,
          latitude: parseFloat(place.y),
          longitude: parseFloat(place.x),
        });
      }
    };

    searchPlaceByKeyword(address);
  }, [address]);

  return placeInfo;
};
