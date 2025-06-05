"use client";

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state with the value from localStorage if available, otherwise use initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Get from local storage by key
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log('Error reading localStorage key', key, ':', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log('Error setting localStorage key', key, ':', error);
    }
  };

  // Use effect to sync with localStorage changes across tabs/windows
  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : null;
          setStoredValue(newValue ?? initialValue);
        } catch (error) {
          console.log('Error parsing localStorage change', e.key, ':', error);
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}