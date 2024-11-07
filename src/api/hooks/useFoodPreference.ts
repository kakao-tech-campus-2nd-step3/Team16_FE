import axios from 'axios';
import { useState } from 'react';
import { useGetCategory } from 'src/api/hooks/useGetCategory';
import type { Food } from 'src/types';

import { baseURL } from '@/api/instance';

export const useFoodPreference = () => {
  const { data: categories = [] } = useGetCategory(); // 카테고리 목록 기본값 설정
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState<Food[]>([]); // 음식 목록 기본값을 빈 배열로 설정
  const [selectedFoods, setSelectedFoods] = useState<Set<number>>(new Set());

  // 선택된 카테고리에 따른 음식 데이터 요청
  const fetchFoodsByCategory = async (category: string) => {
  try {
    const response = await axios.get<{ data: Food[] }>(`${baseURL}/api/foods`, {
      params: { category },
    });
    console.log("Fetched Foods Response:", response.data.data); // 응답 데이터 확인
    setFoods(response.data.data || []); // `data` 필드에 접근
  } catch (error) {
    console.error('음식 데이터를 가져오는 데 실패했습니다:', error);
    setFoods([]); // 오류 시 빈 배열로 설정
  }
};

  // 카테고리 변경 시 호출
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSearchQuery(''); // 카테고리 변경 시 검색어 초기화
    fetchFoodsByCategory(category === '전체' ? '' : category); // '전체' 선택 시 모든 음식 불러오기
  };

  // 검색어 변경 시 호출
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 음식 선택/해제 로직
  const toggleFoodSelection = (foodId: number) => {
    setSelectedFoods((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(foodId)) {
        newSelected.delete(foodId);
      } else {
        newSelected.add(foodId);
      }
      return newSelected;
    });
  };

  // 카테고리와 검색어에 맞는 음식 필터링
  const filteredFoods = Array.isArray(foods)
    ? foods.filter(
        (food) =>
          (selectedCategory === '전체' || food.category === selectedCategory) &&
          food.name.includes(searchQuery)
      )
    : [];

  return {
    categories,
    selectedCategory,
    handleCategoryChange,
    searchQuery,
    handleSearchChange,
    filteredFoods,
    selectedFoods,
    toggleFoodSelection,
  };
};
