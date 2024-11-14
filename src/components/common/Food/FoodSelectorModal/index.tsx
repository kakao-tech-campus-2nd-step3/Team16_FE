import styled from '@emotion/styled';
import { useState } from 'react';

import { useGetCategory } from '@/api/hooks/Food/useGetCategory';
import { useGetFoodsByCategory } from '@/api/hooks/Food/useGetFood';
import { SelectableMenu } from '@/components/common/Menu/SelectableMenu';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

type Props = {
  selectedFoods: Food[];
  onFoodSelect: (food: Food) => void;
  onClose: () => void;
};

export const FoodSelectorModal: React.FC<Props> = ({ selectedFoods, onFoodSelect, onClose }) => {
  const { data: categories } = useGetCategory();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: foodsByCategory } = useGetFoodsByCategory(selectedCategory || undefined, {
    enabled: !!selectedCategory,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoods = foodsByCategory?.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleFoodClick = (food: Food) => {
    onFoodSelect(food);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
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

        {selectedCategory && (
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        )}

        <FoodList>
          {filteredFoods?.map((food) => (
            <SelectableMenu
              key={food.food_id}
              menuName={food.name}
              isSelected={selectedFoods.some((selected) => selected.food_id === food.food_id)}
              onClick={() => handleFoodClick(food)}
            />
          ))}
        </FoodList>

        <ButtonContainer>
          <ConfirmButton onClick={onClose}>선택 완료</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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

const SearchInput = styled.input`
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
  box-sizing: border-box;
  font-size: 1rem;
`;

const FoodList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 100%;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
