import styled from '@emotion/styled';

import { colors } from '@/styles/variants';

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <p>© 2024 Kakao-teck-campus Team-16</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: ${colors.gray};
  padding: 1rem;
  text-align: center;
`;
