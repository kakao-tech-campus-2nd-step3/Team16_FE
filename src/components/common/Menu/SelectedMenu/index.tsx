import styled from '@emotion/styled';

import { colors } from '@/styles/variants';

type Props = { menuName: string };

export const SelectedMenu: React.FC<Props> = ({ menuName }) => {
  return <Menu>{menuName}</Menu>;
};

const Menu = styled.div`
  padding: 0.7rem;
  border: 1px solid ${colors.third};
  border-radius: 0.7rem;
  user-select: none;
  text-align: center;
  color: ${colors.third};
`;
