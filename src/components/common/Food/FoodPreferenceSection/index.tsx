import styled from '@emotion/styled';
import React, { useEffect,useState } from 'react';

import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { AddedMenu } from '@/components/common/Menu/AddedMenu';
import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

type Props = {
  title: string;
  foods: Food[];
  onAddFood: (food: Food) => void;
  onDeleteFood: (foodId: number) => void;
  refetchFoods: () => void;
};

export const FoodPreferenceSection: React.FC<Props> = ({ title, foods, onAddFood, onDeleteFood, refetchFoods }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  const handleAddFood = (food: Food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
    onAddFood(food);
    refetchFoods();
  };

  const handleDeleteFood = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
    onDeleteFood(foodId);
    refetchFoods();
  };

  useEffect(() => {
    refetchFoods();
  }, [refetchFoods]);

  return (
    <CenteredContainer>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <Spacing height={20} />

        <MenuCategory foods={[...foods, ...selectedFoods]}>
          {(food) => (
            <FoodContainer key={food.food_id}>
              <AddedMenu menuName={food.name} onDelete={() => handleDeleteFood(food.food_id)} />
            </FoodContainer>
          )}
        </MenuCategory>

        <IconButton onClick={() => setShowModal(true)}>+</IconButton>

        {showModal && (
          <FoodSelectorModal
            onFoodSelect={(food: Food) => handleAddFood(food)}
            onClose={() => setShowModal(false)}
          />
        )}
      </SectionContainer>
    </CenteredContainer>
  );
};

// 스타일 컴포넌트 정의
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

const Spacing = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
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