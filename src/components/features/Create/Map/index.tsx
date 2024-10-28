import styled from '@emotion/styled';

import { breakpoints } from '@/styles/variants';

export const Map = () => {
  return <MapImg></MapImg>;
};

const MapImg = styled.div`
  flex: 2;
  display: flex;
  background-color: #b4c1b9;

  min-height: 400px;
  width: 100%;

  @media (max-width: ${breakpoints.md}) {
    min-height: 300px;
  }
`;
