import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';

import { colors } from '@/styles/variants';

const MAX_HEIGHT = 500;

const DEFAULT_CENTER = {
  lat: 35.1755091,
  lng: 126.9071166,
};

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

type Props = {
  keyword: string;
  baseLocation?: {
    lat: number;
    lng: number;
  };
};

export const SearchMap: React.FC<Props> = ({ keyword, baseLocation = DEFAULT_CENTER }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const handleSearch = useCallback(
    (m: kakao.maps.Map) => {
      const ps = new kakao.maps.services.Places(m);
      const bounds = new kakao.maps.LatLngBounds();

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newMarkers = data.map((item) => {
              const position = {
                lat: +item.y,
                lng: +item.x,
              };
              bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
              return {
                position,
                content: item.place_name,
              };
            });

            setMarkers(newMarkers);
            map?.setBounds(bounds);
          }
        },
        {
          location: new kakao.maps.LatLng(baseLocation.lat, baseLocation.lng),
          radius: 500,
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 성능 최적화를 위해 의존성 제거
    [keyword],
  );

  useEffect(() => {
    if (!map) return;
    handleSearch(map);
  }, [keyword, map, handleSearch]);

  const mapStyle = useMemo(
    () => ({
      width: '100%',
      height: `${MAX_HEIGHT}px`,
    }),
    [],
  );

  return (
    <Wrapper>
      <Map center={DEFAULT_CENTER} isPanto={false} style={mapStyle} onCreate={setMap}>
        {markers.map(({ content, position }) => {
          const key = `marker-${content}-${position.lat},${position.lng}`;
          return (
            <MapMarker key={key} position={position} onClick={() => setSelectedMarker(content)}>
              {selectedMarker === content && <SelectedMarker>{content}</SelectedMarker>}
            </MapMarker>
          );
        })}
        <Info>
          {markers.map(({ content, position: { lat, lng } }) => (
            <InfoItem
              key={`info-${content}-${lat},${lng}`}
              onClick={() => setSelectedMarker(content)}
              isSelected={selectedMarker === content}
            >
              <InfoItemContent>{content}</InfoItemContent>
              <Link to={`https://map.kakao.com/link/map/${content},${lat},${lng}`} target="_blank">
                <InfoItemLink>지도 보기</InfoItemLink>
              </Link>
            </InfoItem>
          ))}
        </Info>
      </Map>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Info = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: ${MAX_HEIGHT}px;
  overflow-y: auto;
  list-style: none;
`;

const InfoItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1.3rem;
  border-radius: 4px;

  width: 13rem;

  ${({ isSelected }) =>
    isSelected &&
    `
    border-color: ${colors.primary};
    background-color: ${colors.primary_half};
  `}

  &:hover {
    background-color: ${({ isSelected }) => !isSelected && `${colors.secondary}`};
    opacity: ${({ isSelected }) => isSelected && 0.8};
  }
`;

const InfoItemContent = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const InfoItemLink = styled.p`
  font-size: 0.7rem;
  color: ${colors.primary};
  text-decoration: underline;
`;

const SelectedMarker = styled.div`
  padding: 0.5rem;
  font-weight: 600;
  width: 100%;
  text-align: center;
  color: ${colors.primary};
`;
