import styled from '@emotion/styled';
import { useEffect } from 'react';

import { breakpoints } from '@/styles/variants';

import type { Coordinates } from './types';
import { useGeocoder } from './useGeocoder';
import { useGeolocation } from './useGeolocation';
import { useKakaoMap } from './useKakaoMap';
import { usePlaceSearch } from './usePlaceSearch';

export const CreateMap: React.FC = () => {
  const userLocation: Coordinates | null = useGeolocation();

  const coordinates: Coordinates | null = useKakaoMap('map', userLocation);

  const addressInfo = useGeocoder(coordinates);

  const placeInfo = usePlaceSearch(addressInfo?.address || null);

  useEffect(() => {
    if (placeInfo) {
      console.log('최종 장소 정보:', placeInfo);
    }
  }, [placeInfo]);

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
