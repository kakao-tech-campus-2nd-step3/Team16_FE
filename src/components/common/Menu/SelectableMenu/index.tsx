import styled from '@emotion/styled';
import React from 'react';

import { colors } from '@/styles/variants';

type SelectableMenuProps = {
  menuName: string;
  isSelected: boolean;
  onClick: () => void;
};

export const SelectableMenu: React.FC<SelectableMenuProps> = ({ menuName, isSelected, onClick }) => {
  return (
    <SelectableMenuContainer isSelected={isSelected} onClick={onClick}>
      {menuName}
    </SelectableMenuContainer>
  );
};

const SelectableMenuContainer = styled.div<{ isSelected: boolean }>`
  padding: 0.7rem;
  border: 1px solid ${({ isSelected }) => (isSelected ? 'black' : '#e0e0e0')};
  border-radius: 1rem;
  background-color: ${({ isSelected }) => (isSelected ? colors.primary : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? 'white' : colors.primary)};
  text-align: center;
  cursor: pointer;
  font-weight: bold;
`;
