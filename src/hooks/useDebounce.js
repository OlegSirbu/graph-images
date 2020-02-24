import React, { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      setLoading(true)
      const handler = setTimeout(() => {
        setLoading(false);
        setDebouncedValue(value);
      }, delay);

      return () => {
        setLoading(false);
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return {
    loading,
    debouncedValue
  };
}
