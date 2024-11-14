import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CircleMap } from '@/service/KakaoMap/components/CircleMap';
import { useGeolocation } from '@/service/KakaoMap/hooks/useGeolocation';
import type { Coordinates } from '@/service/KakaoMap/types';
import { breakpoints } from '@/styles/variants';
import type { CreateMeetingRequest } from '@/types';

export const CreateMap: React.FC = () => {
  const { setValue } = useFormContext<CreateMeetingRequest>();

  const userLocation = useGeolocation();
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(userLocation);

  useEffect(() => {
    if (userLocation) {
      setSelectedCoordinates(userLocation);
      setValue('baseLocation', {
        name: '이름',
        address: '주소',
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
  }, [userLocation, setValue]);

  const handleMapClick = (coordinates: Coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  if (!userLocation) return <MapContainer>Loading...</MapContainer>;

  return (
    <>
      {selectedCoordinates && (
        <CircleMap
          containerId="map"
          defaultPosition={selectedCoordinates}
          onClick={handleMapClick}
        />
      )}
    </>
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
