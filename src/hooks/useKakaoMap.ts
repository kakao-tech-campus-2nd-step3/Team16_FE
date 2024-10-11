import { useEffect, useState } from 'react';

import { colors } from '@/styles/variants';
import type { Coordinates } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { kakao } = window;

export const useKakaoMap = (
  containerId: string,
  defaultPosition: Coordinates | null,
): Coordinates | null => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!defaultPosition) return;

    const container = document.getElementById(containerId);
    const options = {
      center: new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      map,
    });

    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
      radius: 500,
      strokeWeight: 2,
      strokeColor: colors.primary,
      strokeOpacity: 0.5,
      strokeStyle: 'solid',
      fillColor: colors.primary,
      fillOpacity: 0.2,
    });

    circle.setMap(map);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    kakao.maps.event.addListener(map, 'click', (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      setCoordinates({
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      });
      circle.setPosition(latlng);
    });
  }, [containerId, defaultPosition]);

  return coordinates;
};
