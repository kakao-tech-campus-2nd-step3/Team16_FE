import styled from '@emotion/styled';
import { useState } from 'react';
import { useFoodPreference } from 'src/api/hooks/useFoodPreference';

import type { Food } from '@/types';

interface FoodSelectorProps {
  initialFoods: Food[];
  type: 'preferred' | 'disliked';
  onAddFood: (food: Food) => void;
  onDeleteFood: (foodId: number) => void;
}

export const FoodSelector: React.FC<FoodSelectorProps> = ({ onAddFood, onDeleteFood }) => {
  const [showCategorySearch, setShowCategorySearch] = useState(false);
  const { categories, selectedCategory, handleCategoryChange, searchQuery, handleSearchChange, filteredFoods, selectedFoods, toggleFoodSelection } = useFoodPreference();

  const handleFoodSelect = (food: Food) => {
    const isSelected = selectedFoods.has(food.food_id);
    toggleFoodSelection(food.food_id);

    if (isSelected) {
      onDeleteFood(food.food_id);
    } else {
      onAddFood(food);
    }
  };

  return (
    <Container>
      {showCategorySearch ? (
        <>
          <CloseButton onClick={() => setShowCategorySearch(false)}>닫기</CloseButton>
          <CategoryDropdown value={selectedCategory} onChange={handleCategoryChange}>
            <option value="전체">전체</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </CategoryDropdown>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchButton>🔍</SearchButton>
          </SearchContainer>
          <FoodList>
            {filteredFoods.map((food) => (
              <FoodItem
                key={food.food_id}
                selected={selectedFoods.has(food.food_id)}
                onClick={() => handleFoodSelect(food)}
              >
                {food.name}
              </FoodItem>
            ))}
          </FoodList>
        </>
      ) : (
        <AddButton onClick={() => setShowCategorySearch(true)}>추가</AddButton>
      )}
    </Container>
  );
};

// 스타일링 컴포넌트들 그대로 유지

// 스타일링 컴포넌트
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: center;
`;

const CategoryDropdown = styled.select`
  padding: 10px;
  border: 1px solid #a0b4a2;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #a0b4a2;
  border-radius: 5px;
  flex: 1;
`;

const SearchButton = styled.button`
  background-color: #4c9f70;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background-color: #a0b4a2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  background-color: #a0b4a2;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const FoodList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-top: 15px;
`;

const FoodItem = styled.button<{ selected: boolean }>`
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #a0b4a2;
  background-color: ${({ selected }) => (selected ? '#4c9f70' : '#fff')};
  color: ${({ selected }) => (selected ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #4c9f70;
    color: #fff;
  }
`;
