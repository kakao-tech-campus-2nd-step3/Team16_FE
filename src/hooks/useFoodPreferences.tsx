import { useEffect, useState } from 'react';

import type { Food } from '@/types';

type UseFoodPreferencesOptions = {
  initialFoods: Food[] | undefined;
  preferences: number[];
  setPreferences: (ids: number[]) => void;
  onAddFood?: (food: Food) => void;
  onRemoveFood?: (food_id: number) => void;
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
      const foodIds = initialFoods.map((food) => food.food_id);
      setSelectedFoods(initialFoods);
      setPreferences(foodIds);
      setIsInitialized(true);
    }
  }, [initialFoods, preferences.length, isInitialized, setPreferences]);

  const handleFoodSelect = (food: Food) => {
    const isAlreadySelected = selectedFoods.some((selected) => selected.food_id === food.food_id);

    if (isAlreadySelected) {
      setSelectedFoods((prevFoods) => prevFoods.filter((f) => f.food_id !== food.food_id));
      setPreferences(preferences.filter((id) => id !== food.food_id));
      if (onRemoveFood) onRemoveFood(food.food_id);
    } else {
      setSelectedFoods((prevFoods) => [...prevFoods, food]);
      setPreferences([...preferences, food.food_id]);
      if (onAddFood) onAddFood(food);
    }
  };

  const handleFoodRemove = (food_id: number) => {
    setSelectedFoods((prevFoods) => prevFoods.filter((food) => food.food_id !== food_id));
    setPreferences(preferences.filter((id) => id !== food_id));
    if (onRemoveFood) onRemoveFood(food_id);
  };

  return {
    selectedFoods,
    handleFoodSelect,
    handleFoodRemove,
  };
};
