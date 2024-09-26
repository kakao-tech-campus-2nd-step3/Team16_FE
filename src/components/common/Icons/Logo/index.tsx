import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';

type Props = {
  width?: string;
  height?: string;
} & HTMLAttributes<HTMLImageElement>;
const Logo = ({ ...rest }: Props) => {
  return <StyledLogo src="/icons/bobting-logo.svg" alt="Logo" {...rest} />;
};

const StyledLogo = styled.img`
  width: ${({ width }) => width || '100%'};
`;

export default Logo;
