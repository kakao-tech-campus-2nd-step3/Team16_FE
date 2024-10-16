import { useEffect, useState } from 'react';

import type { PlaceInfo } from '@/types';

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export const usePlaceSearch = (address: string | null): PlaceInfo | null => {
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);

  useEffect(() => {
    console.log(KAKAO_API_KEY);
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
