import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import { useAddFoodPreference } from '@/api/hooks/useAddFoodPreference';
import { useDeleteFoodPreference } from '@/api/hooks/useDeleteFoodPreference';
import { useGetPreferenceFoods } from '@/api/hooks/useGetPreferenceFoods';
import { Spacing } from '@/components/common/layouts/Spacing';
import { DefaultMenu } from '@/components/common/Menu/DefaultMenu';
import { MenuCategory } from '@/components/common/Menu/MenuCategory';
import { CategoryDropdownMenu } from '@/components/features/MyPage/FoodSelector';
import { colors } from '@/styles/variants';
import type { Food } from '@/types';

export const PreferenceSection: React.FC = () => {
  const { data: preferredFoods, isLoading, isError, refetch } = useGetPreferenceFoods();
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const addFoodPreference = useAddFoodPreference({ type: 'preferred' });
  const deleteFoodPreference = useDeleteFoodPreference('preferred');

  const handleAddFood = (food: Food) => {
    setSelectedFoods((prevFoods) => [...prevFoods, food]);
    addFoodPreference.mutate({
      food_id: food.food_id,
      category: food.category,
      name: food.name,
    });
  };

  const handleDeleteFood = (foodId: number) => {
    deleteFoodPreference.mutate(foodId, {
      onSuccess: () => {
        setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== foodId));
        refetch();
      },
    });
  };

  const handleConfirmSelection = () => {
    refetch();
    setShowDropdownMenu(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading preferences</p>;

  return (
    <PageContainer>
      <ContentContainer>
        <SectionContainer>
          <SectionTitle>선호하는 음식</SectionTitle>
          <Spacing height={20} />

          <MenuCategory foods={[...(preferredFoods || []), ...selectedFoods]}>
            {(food) => (
              <FoodContainer key={food.food_id}>
                <DefaultMenu menuName={food.name} />
                <DeleteButton onClick={() => handleDeleteFood(food.food_id)}>×</DeleteButton>
              </FoodContainer>
            )}
          </MenuCategory>

          <IconButton onClick={() => setShowDropdownMenu(true)}>+</IconButton>

          {showDropdownMenu && (
            <CategoryDropdownMenu
              onFoodSelect={(food: Food) => handleAddFood(food)}
              onClose={handleConfirmSelection}
            />
          )}
        </SectionContainer>
      </ContentContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const ContentContainer = styled.div`
  max-width: 1020px;
  width: 100%;
`;

const SectionContainer = styled.div`
  margin-bottom: 30px;
  position: relative;
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
  border: 1px solid ${colors.primary};
  border-radius: 1rem;
  padding: 0.3rem;
  color: ${colors.primary};
  position: relative;
  margin-right: 8px;
  gap: 8px;
  
  & > div {
    flex: 1;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${colors.primary};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding-left: 8px;
`;

export default PreferenceSection;
