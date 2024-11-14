import styled from '@emotion/styled';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { usePlaceSearch } from '@/service/KakaoMap/api/usePlaceSearch';
import { CircleMap } from '@/service/KakaoMap/components/CircleMap';
import { useGeocoder } from '@/service/KakaoMap/hooks/useGeocoder';
import { useGeolocation } from '@/service/KakaoMap/hooks/useGeolocation';
import type { Coordinates } from '@/service/KakaoMap/types';
import { breakpoints } from '@/styles/variants';
import type { CreateMeetingRequest, PlaceInfo } from '@/types';

export const CreateMap: React.FC = () => {
  const { setValue } = useFormContext<CreateMeetingRequest>();

  const {
    location: userLocation,
    isLoading: isGeolocationLoading,
    isError: geolocationError,
  } = useGeolocation();

  const {
    addressInfo: addressInfo,
    isLoading: isGeocoding,
    isError: geocoderError,
  } = useGeocoder(userLocation);

  const {
    data: rawPlaceInfo,
    isLoading: isPlaceLoading,
    isError: placeSearchError,
  } = usePlaceSearch(addressInfo?.address || null);

  const placeInfo: PlaceInfo | null = useMemo(() => {
    return rawPlaceInfo
      ? {
          location_id: rawPlaceInfo.location_id || '0',
          name: rawPlaceInfo.name || '',
          address: rawPlaceInfo.address || '',
          latitude: rawPlaceInfo.latitude || 0,
          longitude: rawPlaceInfo.longitude || 0,
        }
      : null;
  }, [rawPlaceInfo]);

  useEffect(() => {
    if (userLocation && placeInfo) {
      setValue('baseLocation', {
        location_id: placeInfo.location_id ? +placeInfo.location_id : 0,
        name: placeInfo.name,
        address: placeInfo.address,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      });
    }
  }, [userLocation, setValue, placeInfo]);

  const handleMapClick = (coordinates: Coordinates) => {
    if (placeInfo) {
      setValue('baseLocation', {
        location_id: placeInfo.location_id ? +placeInfo.location_id : 0,
        name: placeInfo.name,
        address: placeInfo.address,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      });
    }
  };

  if (isGeolocationLoading || isGeocoding || isPlaceLoading) {
    return <div>Loading...</div>;
  }

  if (geolocationError || geocoderError || placeSearchError) {
    return <div>Error: Unable to load map data.</div>;
  }

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
