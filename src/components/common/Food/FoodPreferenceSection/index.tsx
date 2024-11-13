import styled from '@emotion/styled';

import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

import { Spacing } from '../../layouts/Spacing';
import { AddedMenu } from '../../Menu/AddedMenu';

type Props = {
  title: string;
  foods: Food[];
  onDeleteFood: (foodId: number) => void;
  onOpenModal: () => void;
};

export const FoodPreferenceSection: React.FC<Props> = ({
  title,
  foods,
  onDeleteFood,
  onOpenModal,
}) => {
  return (
    <CenteredContainer>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <Spacing height={20} />

        <MenuCategory foods={foods}>
          {(food) => (
            <FoodContainer key={food.food_id}>
              <AddedMenu menuName={food.name} onDelete={() => onDeleteFood(food.food_id)} />
            </FoodContainer>
          )}
        </MenuCategory>

        <IconButton onClick={onOpenModal}>+</IconButton>
      </SectionContainer>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 1020px;
  width: 100%;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  user-select: none;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${colors.gray};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  line-height: 1;
`;

const FoodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
`;
