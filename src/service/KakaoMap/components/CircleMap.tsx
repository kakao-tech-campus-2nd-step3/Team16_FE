import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { breakpoints } from '@/styles/variants';

import type { CircleMapProps, Coordinates } from '../types';
import { Circle } from './Circle';
import { Marker } from './Marker';

export const CircleMap: React.FC<CircleMapProps> = ({ containerId, defaultPosition, onClick }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultPosition);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container || mapRef.current) return;

    const options: kakao.maps.MapOptions = {
      center: new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
      level: 4,
    };

    mapRef.current = new kakao.maps.Map(container, options);

    kakao.maps.event.addListener(
      mapRef.current,
      'click',
      (mouseEvent: kakao.maps.event.MouseEvent) => {
        const latlng = mouseEvent.latLng;
        const newCoordinates = { lat: latlng.getLat(), lng: latlng.getLng() };
        setCoordinates(newCoordinates);
        if (onClick) onClick(newCoordinates);
      },
    );
  }, [containerId, defaultPosition, onClick]);

  return (
    <MapContainer id={containerId}>
      {mapRef.current && coordinates && (
        <>
          <Marker map={mapRef.current} position={coordinates} />
          <Circle map={mapRef.current} position={coordinates} radius={500} />
        </>
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
