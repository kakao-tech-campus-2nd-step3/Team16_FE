import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

import { breakpoints, colors } from '@/styles/variants';

import type { CircleMapProps, Coordinates } from '../types';

export const CircleMap: React.FC<CircleMapProps> = ({ containerId, defaultPosition, onClick }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(defaultPosition);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!window.kakao) {
      console.error('카카오 지도 API가 로드되지 않았습니다.');
      return;
    }

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

  useEffect(() => {
    if (mapRef.current && coordinates) {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        map: mapRef.current,
      });

      const circle = new kakao.maps.Circle({
        center: new kakao.maps.LatLng(coordinates.lat, coordinates.lng),
        radius: 500,
        strokeWeight: 2,
        strokeColor: colors.primary,
        strokeOpacity: 0.5,
        strokeStyle: 'solid',
        fillColor: colors.primary,
        fillOpacity: 0.2,
      });
      circle.setMap(mapRef.current);

      return () => {
        marker.setMap(null);
        circle.setMap(null);
      };
    }
  }, [coordinates]);

  return <MapContainer id={containerId}></MapContainer>;
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
