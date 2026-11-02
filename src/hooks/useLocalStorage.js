import { useEffect, useState } from 'react';

function readStoredValue(key, initialValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  } catch {
    // Storage can be blocked (private mode, strict settings) or contain broken data.
    return initialValue;
  }
}

/*
  Works like useState, but the value is also saved in the browser's localStorage
  so it survives a page refresh. Fails safely if storage is unavailable.
*/
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Saving failed (e.g. storage full or blocked). The app keeps working in memory.
    }
  }, [key, value]);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    function handleStorageChange(event) {
      if (event.key === key) {
        setValue(readStoredValue(key, initialValue));
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
    // initialValue is only a fallback, so changes to it should not re-run this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, setValue];
}
