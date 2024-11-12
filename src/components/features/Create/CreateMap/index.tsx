import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePlaceSearch } from '@/api/hooks/usePlaceSearch';
import { CircleMap } from '@/service/KakaoMap/components/CircleMap';
import { useGeocoder } from '@/service/KakaoMap/hooks/useGeocoder';
import { useGeolocation } from '@/service/KakaoMap/hooks/useGeolocation';
import type { Coordinates } from '@/service/KakaoMap/types';
import { breakpoints } from '@/styles/variants';
import type { CreateMeetingRequest } from '@/types';

export const CreateMap: React.FC = () => {
  const { setValue } = useFormContext<CreateMeetingRequest>();
  const userLocation: Coordinates | null = useGeolocation();
  const addressInfo = useGeocoder(userLocation);
  const placeInfo = usePlaceSearch(addressInfo?.address || null);

  useEffect(() => {
    if (userLocation) {
      setValue('baseLocation', {
        location_id: placeInfo?.location_id ? +placeInfo.location_id : 0,
        name: placeInfo?.name || '',
        address: placeInfo?.address || '',
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
  }, [userLocation, setValue, placeInfo]);

  const handleMapClick = (coordinates: Coordinates) => {
    setValue('baseLocation', {
      location_id: placeInfo?.location_id ? +placeInfo.location_id : 0,
      name: placeInfo?.name || '',
      address: placeInfo?.address || '',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
  };

  return (
    <MapContainer>
      {userLocation && (
        <CircleMap containerId="map" defaultPosition={userLocation} onClick={handleMapClick} />
      )}
    </MapContainer>
  );
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
