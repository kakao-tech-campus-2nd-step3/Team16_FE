import { useEffect, useState } from 'react';

import type { Coordinates } from '../types';

export const useGeolocation = () => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting the user's location:", error);
          setLocation({
            lat: 37.5665,
            lng: 126.978,
          });
          setIsLoading(false);
          setIsError(true);
        },
      );
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  }, []);

  return { location, isLoading, isError };
};
