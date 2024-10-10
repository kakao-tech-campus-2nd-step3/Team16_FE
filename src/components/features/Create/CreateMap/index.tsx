import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import type { CreateFormInputs } from '@/hooks/useCreateFormContext';
import { useGeocoder } from '@/hooks/useGeocoder';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useKakaoMap } from '@/hooks/useKakaoMap';
import { usePlaceSearch } from '@/hooks/usePlaceSearch';
import { breakpoints } from '@/styles/variants';
import type { Coordinates } from '@/types';

export const CreateMap: React.FC = () => {
  const { setValue } = useFormContext<CreateFormInputs>();
  const userLocation: Coordinates | null = useGeolocation();
  const coordinates: Coordinates | null = useKakaoMap('map', userLocation);
  const addressInfo = useGeocoder(coordinates);
  const placeInfo = usePlaceSearch(addressInfo?.address || null);

  useEffect(() => {
    if (placeInfo) {
      setValue('baseLocation', {
        location_id: Number(placeInfo.location_id),
        name: placeInfo.name,
        address: placeInfo.address,
        latitude: coordinates?.lat || 0,
        longitude: coordinates?.lng || 0,
      });
    }
  }, [placeInfo, setValue, coordinates?.lat, coordinates?.lng]);

  return <MapContainer id="map" />;
};

const MapContainer = styled.div`
  flex: 2;
  display: flex;
  min-height: 400px;
  width: 100%;

  @media (max-width: ${breakpoints.md}) {
    min-height: 300px;
  }
`;
