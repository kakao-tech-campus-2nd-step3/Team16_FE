import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import type { CircleMapProps, Coordinates } from '../types';
import { Circle } from './Circle';
import { Marker } from './Marker';

export const CircleMap: React.FC<CircleMapProps> = ({ containerId, defaultPosition, onClick }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!defaultPosition) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const options: kakao.maps.MapOptions = {
      center: new kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
      level: 4,
    };
    const createdMap = new kakao.maps.Map(container, options);
    setMap(createdMap);

    kakao.maps.event.addListener(createdMap, 'click', (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      setCoordinates({ lat: latlng.getLat(), lng: latlng.getLng() });
      if (onClick) onClick({ lat: latlng.getLat(), lng: latlng.getLng() });
    });
  }, [containerId, defaultPosition, onClick]);

  return (
    <MapContainer id={containerId}>
      {map && coordinates && (
        <>
          <Marker map={map} position={coordinates} />
          <Circle map={map} position={coordinates} radius={500} />
        </>
      )}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
