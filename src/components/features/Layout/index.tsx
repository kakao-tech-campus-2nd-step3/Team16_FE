import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import Header from './Header';

export const Layout = () => (
  <Wrapper>
    <Header />
    <InnerWrapper>
      <Outlet />
    </InnerWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`;
