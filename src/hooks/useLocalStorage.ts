import { useState, useEffect } from 'react';

export function useLocalStorage(
  key = 'searchValue'
): [string, (data: string) => void] {
  // const [value, setValue] = useState(localStorage.getItem(key) || '');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setValue(localStorage.getItem(key) || '');
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
