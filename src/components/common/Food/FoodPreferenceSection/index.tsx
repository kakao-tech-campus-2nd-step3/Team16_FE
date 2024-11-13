import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { FoodSelectorModal } from '@/components/common/Food/FoodSelectorModal';
import { AddedMenu } from '@/components/common/Menu/AddedMenu';
import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

import { Spacing } from '../../layouts/Spacing';

type Props = {
  title: string;
  foods: Food[];
  onAddFood: (food: Food) => void;
  onDeleteFood: (foodId: number) => void;
  refetchFoods: () => void;
};

export const FoodPreferenceSection: React.FC<Props> = ({ title, foods, onAddFood, onDeleteFood, refetchFoods }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>(foods);

  useEffect(() => {
    setSelectedFoods(foods);
  }, [foods]);

  const handleFoodToggle = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);
    if (isAlreadySelected) {
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.food_id !== food.food_id));
      onDeleteFood(food.food_id);
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      onAddFood(food);
    }
    refetchFoods();
  };

  return (
    <CenteredContainer>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <Spacing height={20} />

        <MenuCategory foods={selectedFoods}>
          {(food) => (
            <FoodContainer key={food.food_id}>
              <AddedMenu menuName={food.name} onDelete={() => handleFoodToggle(food)} />
            </FoodContainer>
          )}
        </MenuCategory>

        <IconButton onClick={() => setShowModal(true)}>+</IconButton>

        {showModal && (
          <FoodSelectorModal
            selectedFoods={selectedFoods}
            onFoodSelect={(food: Food) => handleFoodToggle(food)}
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