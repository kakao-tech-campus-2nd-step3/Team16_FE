import { useEffect } from 'react';

import { colors } from '@/styles/variants';

import type { CircleProps } from '../types';

export const Circle: React.FC<CircleProps> = ({ map, position, radius }) => {
  useEffect(() => {
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(position.lat, position.lng),
      radius,
      strokeWeight: 2,
      strokeColor: colors.primary,
      strokeOpacity: 0.5,
      strokeStyle: 'solid',
      fillColor: colors.primary,
      fillOpacity: 0.2,
    });

    circle.setMap(map);

    return () => circle.setMap(null);
  }, [map, position, radius]);

  return null;
};
