import { useEffect, useState } from 'react';

import type { AddressInfo, Coordinates } from '../types';

export const useGeocoder = (coordinates: Coordinates | null) => {
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);

  useEffect(() => {
    if (!coordinates) return;

    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(coordinates.lng, coordinates.lat, (result, status) => {
      if (status === 'OK') {
        const address = result[0].road_address
          ? result[0].road_address.address_name
          : result[0].address.address_name;

        setAddressInfo({
          address,
          roadAddress: result[0].road_address ? result[0].road_address.address_name : null,
        });
      }
    });
  }, [coordinates]);

  return addressInfo;
};
