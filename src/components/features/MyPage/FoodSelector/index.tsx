// FoodSelector/index.ts
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { useGetCategory } from '@/api/hooks/useGetCategory';
import { useGetFoodsByCategory } from '@/api/hooks/useGetFood';
import { DefaultMenu } from '@/components/common/Menu/DefaultMenu';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

type Props = {
  onFoodSelect: (food: Food) => void;
  onClose: () => void;
};

export const CategoryDropdownMenu: React.FC<Props> = ({ onFoodSelect, onClose }) => {
  const { data: categories } = useGetCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const { data: foodsByCategory } = useGetFoodsByCategory(selectedCategory || undefined, {
    enabled: !!selectedCategory,
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleFoodClick = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);
    if (isAlreadySelected) {
      setSelectedFoods(selectedFoods.filter((selected) => selected.food_id !== food.food_id));
    } else {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleConfirmSelection = () => {
    selectedFoods.forEach((food) => onFoodSelect(food));
    onClose();
  };

  return (
    <Container>
      <DropdownContainer>
        <CategoryDropdown onChange={handleCategoryChange} value={selectedCategory || ''}>
          <option value="" disabled>
            카테고리 선택
          </option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </CategoryDropdown>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </DropdownContainer>

      <FoodList>
        {foodsByCategory?.map((food) => (
          <StyledFoodItem
            key={food.food_id}
            onClick={() => handleFoodClick(food)}
            isSelected={selectedFoods.some((selected) => selected.food_id === food.food_id)}
          >
            <DefaultMenu menuName={food.name} />
          </StyledFoodItem>
        ))}
      </FoodList>

      <ConfirmButton onClick={handleConfirmSelection}>선택 완료</ConfirmButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  gap: 10px;
`;

const CategoryDropdown = styled.select`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  padding: 8px 12px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FoodList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 100%;
  overflow: auto;
`;

const StyledFoodItem = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  background-color: ${(props) => (props.isSelected ? `${colors.primary}20` : 'white')}; 
  color: ${colors.primary}; 
  border: 1px solid ${colors.primary}; 
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primary_half}; 
  }
`;

const ConfirmButton = styled.button`
  margin-top: 10px;
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default CategoryDropdownMenu;
