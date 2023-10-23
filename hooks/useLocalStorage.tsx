import { useState } from "react";

// Use local storage to store and lesson completion progress
export function useLocalStorage(route: { module: string; lesson: string }) {
  const key = `${route.module}-${route.lesson}`;

  const getStoredValue = () => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : 0;
    }
    return 0;
  };

  const [value, setValue] = useState(getStoredValue);

  const setStoredValue = (newValue: number) => {
    if (newValue > value) {
      setValue(newValue);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    }
  };

  return [value, setStoredValue];
}
