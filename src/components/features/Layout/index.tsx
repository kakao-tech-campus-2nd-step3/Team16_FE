import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

// import { Spacing } from '@/components/common/layouts/Spacing';
import { Footer } from './Footer';
import { Header } from './Header';

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 80;

export const Layout = () => (
  <Wrapper>
    <Header height={HEADER_HEIGHT} />
    <InnerWrapper>
      <Outlet />
    </InnerWrapper>
    <Footer />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const InnerWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
`;
