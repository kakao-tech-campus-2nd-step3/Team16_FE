import { useEffect, useState } from 'react';

import type { AddressInfo, Coordinates } from '@/types';

export interface GeocoderResult {
  address: {
    address_name: string;
  };
  road_address?: {
    address_name: string;
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { kakao } = window;

type GeocoderStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

export const useGeocoder = (coordinates: Coordinates | null): AddressInfo | null => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);

  useEffect(() => {
    if (!coordinates) return;

    const geocoder = new kakao.maps.services.Geocoder();

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
        }
      },
    );
  }, [coordinates]);

  return addressInfo;
};
