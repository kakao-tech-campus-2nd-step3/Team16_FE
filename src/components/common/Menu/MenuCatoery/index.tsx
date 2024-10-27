import styled from '@emotion/styled';

import type { Food } from '@/api/hooks/useGetRecommendMenu';
import { colors } from '@/styles/variants';

export const menuCategories = ['한식', '중식', '일식', '양식', '카페,디저트', '술집'] as const;

type Props = {
  foods: Food[];
  children: (props: Food) => React.ReactNode;
};

export const MenuCategory: React.FC<Props> = ({ foods, children }) => {
  return (
    <Wrapper>
      {menuCategories.map((menuCategory) => (
        <CategoryList key={menuCategory}>
          <CategoryTitle>{menuCategory}</CategoryTitle>
          <MenuList>
            {foods.map((food) => (
              <>{food.category === menuCategory && children(food)}</>
            ))}
          </MenuList>
        </CategoryList>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const CategoryList = styled.li`
  user-select: none;
`;

const CategoryTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  background-color: ${colors.primary};
  text-align: center;
  color: white;
  padding: 0.7rem;
  border-radius: 0.1rem;
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
