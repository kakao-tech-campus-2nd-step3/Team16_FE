import { useEffect, useState } from 'react';

import type { Food } from '@/types';

type UseFoodPreferencesOptions = {
  initialFoods: Food[] | undefined;
  preferences: number[];
  setPreferences: (ids: number[]) => void;
  onAddFood?: (food: Food) => void;
  onRemoveFood?: (foodId: number) => void;
};

export const useFoodPreferences = ({
  initialFoods,
  preferences,
  setPreferences,
  onAddFood,
  onRemoveFood,
}: UseFoodPreferencesOptions) => {
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (initialFoods && preferences.length === 0 && !isInitialized) {
      const foodIds = initialFoods.map((food) => food.foodId);
      setSelectedFoods(initialFoods);
      setPreferences(foodIds);
      setIsInitialized(true);
    }
  }, [initialFoods, preferences.length, isInitialized, setPreferences]);

  const handleFoodSelect = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.foodId === food.foodId);

    if (isAlreadySelected) {
      // 이미 선택 되어있다면
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.foodId !== food.foodId)); //제거
      setPreferences(preferences.filter((id) => id !== food.foodId));
      if (onRemoveFood) onRemoveFood(food.foodId);
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      setPreferences([...preferences, food.foodId]);
      if (onAddFood) onAddFood(food);
    }
  };

  const handleFoodRemove = (foodId: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.foodId !== foodId));
    setPreferences(preferences.filter((id) => id !== foodId));
    if (onRemoveFood) onRemoveFood(foodId);
  };

  return {
    selectedFoods: initialFoods || selectedFoods,
    handleFoodSelect,
    handleFoodRemove,
  };
};
