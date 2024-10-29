import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import { Spacing } from '@/components/common/layouts/Spacing';

import { Footer } from './Footer';
import { Header } from './Header';

export const Layout = () => (
  <Wrapper>
    <Header />
    <InnerWrapper>
      <Outlet />
    </InnerWrapper>
    <Spacing height={80} />
    <Footer />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div``;
