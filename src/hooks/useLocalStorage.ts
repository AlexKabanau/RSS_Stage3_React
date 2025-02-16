import { useState, useEffect } from 'react';

export function useLocalStorage(
  key = 'searchValue'
): [string, (data: string) => void] {
  // debugger;
  const [value, setValue] = useState(localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
