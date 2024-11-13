import styled from '@emotion/styled';
import React from 'react';

import { colors } from '@/styles/variants';

type AddedMenuProps = {
  menuName: string;
  onDelete: () => void;
};

export const AddedMenu: React.FC<AddedMenuProps> = ({ menuName, onDelete }) => {
  return (
    <MenuContainer>
      <MenuText>{menuName}</MenuText>
      <DeleteButton onClick={onDelete}>&times;</DeleteButton>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem;
  border: 1px solid #e0e0e0;
  border-radius: 1rem;
  color: ${colors.primary};
  font-size: 1rem;
  font-weight: bold;
`;

const MenuText = styled.span`
  margin-right: 0.5rem;
`;

const DeleteButton = styled.span`
  color: ${colors.primary};
  font-size: 1rem;
  cursor: pointer;
`;
