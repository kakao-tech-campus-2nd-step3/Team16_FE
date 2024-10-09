import { useEffect, useState } from 'react';

import type { Coordinates } from './types';

export const useGeolocation = (): Coordinates | null => {
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting the user's location:", error);
          setLocation({
            lat: 37.5665,
            lng: 126.978,
          });
        },
      );
    }
  }, []);

  return location;
};
