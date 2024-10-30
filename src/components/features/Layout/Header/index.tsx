import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { Logo } from '@/components/common/Icons/Logo';

import { HeaderUserIcon } from '../../User/HeaderUserIcon';

type Props = {
  height?: number;
};

export const Header: React.FC<Props> = ({ height }) => {
  const router = useNavigate();

  const handleLogoClick = () => {
    router('/');
  };

  return (
    <StyledHeader height={height}>
      <Logo width="14rem" onClick={handleLogoClick} />
      <HeaderUserIcon />
    </StyledHeader>
  );
};

export const StyledHeader = styled.header<Props>`
  display: flex;
  justify-content: space-between;
  height: ${(props) => (props.height ? `${props.height}px` : '4rem')};
  align-items: center;
  background-color: #fff;
  padding-inline: 0.75rem;
  z-index: 100;
`;
