import { useEffect } from 'react';

import type { MarkerProps } from '../types';

export const Marker: React.FC<MarkerProps> = ({ map, position }) => {
  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      map,
    });

    return () => marker.setMap(null);
  }, [map, position]);

  return null;
};
