import { useEffect, useState } from 'react';

import type { AddressInfo } from '@/types';

import type { Coordinates } from '../types';

export interface GeocoderResult {
  address: {
    address_name: string;
  };
  road_address?: {
    address_name: string;
  } | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const { kakao } = window;

type GeocoderStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

export const useGeocoder = (coordinates: Coordinates | null) => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!coordinates) return;

    const geocoder = new kakao.maps.services.Geocoder();

    setIsLoading(true);
    setIsError(false);

    geocoder.coord2Address(
      coordinates.lng,
      coordinates.lat,
      (result: GeocoderResult[], status: GeocoderStatus) => {
        if (status === 'OK') {
          const address = result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          setAddressInfo({
            address: address,
            roadAddress: result[0].road_address ? result[0].road_address.address_name : null,
          });
          setIsLoading(false);
        } else {
          setIsError(true);
          setIsLoading(false);
        }
      },
    );
  }, [coordinates]);

  return { addressInfo, isLoading, isError };
};
