import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import UserProfile from '@/components/common/User/UserProfile';

const Header = () => {
  // 서버에서 가져오도록 수정
  const profileImage = '/images/user/user1.png';

  return (
    <Container>
      <StyledHeader>
        <img src="/icons/bobting-logo.svg" alt="" />

        {/* userIcon */}
        <UserProfile profileImage={profileImage} />
      </StyledHeader>
    </Container>
  );
};

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.75rem;
  border: 1px solid #e0e0e0;
  width: 100%;
`;

export default Header;
