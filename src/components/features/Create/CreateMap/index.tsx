import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { breakpoints } from '@/styles/variants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { kakao } = window;

interface Coordinates {
  lat: number;
  lng: number;
}

export const CreateMap: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(null);

  const fetchCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        () => {
          setCurrentPosition({ lat: 33.450701, lng: 126.570667 });
        },
      );
    } else {
      setCurrentPosition({ lat: 33.450701, lng: 126.570667 });
    }
  };

  const initializeMap = (position: Coordinates) => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
      map: map,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    kakao.maps.event.addListener(map, 'click', function (mouseEvent: kakao.maps.event.MouseEvent) {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
    });
  };

  useEffect(() => {
    fetchCurrentPosition();
  }, []);

  useEffect(() => {
    if (currentPosition) {
      initializeMap(currentPosition);
    }
  }, [currentPosition]);

  return (
    <>
      <MapContainer id="map" />
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
