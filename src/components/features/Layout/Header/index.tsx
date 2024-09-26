import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/common/Icons/Logo';

import HeaderUserIcon from '../../User/HeaderUserIcon';

const Header = () => {
  const router = useNavigate();

  const handleLogoClick = () => {
    router('/');
  };

  return (
    <StyledHeader>
      <Logo width="16rem" onClick={handleLogoClick} />
      <HeaderUserIcon />
    </StyledHeader>
  );
};

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-inline: 0.75rem;
  z-index: 100;
`;

export default Header;
