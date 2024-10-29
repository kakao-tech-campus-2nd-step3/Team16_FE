import styled from '@emotion/styled';

import { colors } from '@/styles/variants';

type Props = { menuName: string };

export const DefaultMenu: React.FC<Props> = ({ menuName }) => {
  return <Menu>{menuName}</Menu>;
};

const Menu = styled.div`
  padding: 0.7rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.7rem;
  user-select: none;
  text-align: center;
  color: ${colors.primary};
`;
