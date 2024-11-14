import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePlaceSearch } from '@/service/KakaoMap/api/usePlaceSearch';
import { CircleMap } from '@/service/KakaoMap/components/CircleMap';
import { useGeocoder } from '@/service/KakaoMap/hooks/useGeocoder';
import { useGeolocation } from '@/service/KakaoMap/hooks/useGeolocation';
import type { Coordinates } from '@/service/KakaoMap/types';
import { breakpoints } from '@/styles/variants';
import type { CreateMeetingRequest } from '@/types';

export const CreateMap: React.FC = () => {
  const { setValue } = useFormContext<CreateMeetingRequest>();

  const userLocation = useGeolocation();
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(userLocation);

  const addressInfo = useGeocoder(selectedCoordinates);
  const { data } = usePlaceSearch(addressInfo?.address || null);

  useEffect(() => {
    if (userLocation) {
      setSelectedCoordinates(userLocation);
      setValue('baseLocation', {
        location_id: data?.location_id || 0,
        name: data?.name || '',
        address: data?.address || '',
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
  }, [userLocation, setValue, data]);

  const handleMapClick = (coordinates: Coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  return (
    <MapContainer>
      {selectedCoordinates && (
        <CircleMap
          containerId="map"
          defaultPosition={selectedCoordinates}
          onClick={handleMapClick}
        />
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
