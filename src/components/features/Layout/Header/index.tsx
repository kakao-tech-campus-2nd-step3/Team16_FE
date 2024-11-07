import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';

import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { Logo } from '@/components/common/Icons/Logo';
import { HeaderUserIcon } from '@/components/features/User/HeaderUserIcon';
import { RouterPath } from '@/routes/path';

type Props = {
  height?: number;
};

export const Header: React.FC<Props> = ({ height }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate를 선언

  useGetUserProfile();

  const handleLogoClick = () => {
    navigate(RouterPath.home);
  };

  return (
    <StyledHeader height={height}>
      <Logo width="14rem" onClick={handleLogoClick} />
      <Link to={RouterPath.mypage}>
        <HeaderUserIcon />
      </Link>
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
