import { useState } from "react";

// Use session storage to store and update lesson progress
export function useSessionStorage(route: { module: string; lesson: string }) {
  const key = `${route.module}-${route.lesson}`;

  const getStoredValue = () => {
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : 0;
    }
    return 0;
  };

  const [value, setValue] = useState(getStoredValue);

  const setStoredValue = (newValue: number) => {
    setValue(newValue);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue];
}

// // Check if there is a stored lesson section index in sessionStorage
// const getInitialLessonIndex = () => {
//   if (typeof window !== "undefined") {
//     const lessonKey = `${route.module}-${route.lesson}`;
//     const storedIndex = sessionStorage.getItem(lessonKey);
//     return storedIndex ? Number(storedIndex) : 0;
//   }
//   return 0;
// };

// const [currentLessonIndex, setCurrentLessonIndex] = useState(
//   getInitialLessonIndex,
// );
