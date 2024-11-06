import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { useGetUserProfile } from '@/api/hooks/useGetUser';
import { Logo } from '@/components/common/Icons/Logo';
import { HeaderUserIcon } from '@/components/features/User/HeaderUserIcon';
import { RouterPath } from '@/routes/path';

type Props = {
  height?: number;
};

export const Header: React.FC<Props> = ({ height }) => {
  const navigate = useNavigate();
  const { data: profileData, status } = useGetUserProfile();

  const handleLogoClick = () => {
    navigate(RouterPath.home);
  };

  const handleUserIconClick = () => {
    navigate(RouterPath.mypage);
  };

  const profileImageUrl =
    status === 'pending' || status === 'error'
      ? undefined
      : profileData?.profile_image_url;

  return (
    <StyledHeader height={height}>
      <Logo width="14rem" onClick={handleLogoClick} />
      <HeaderUserIcon profileImageUrl={profileImageUrl} onClick={handleUserIconClick} />
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
