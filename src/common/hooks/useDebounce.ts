import { useEffect, useState } from 'react';
import { QUIZ_APP_CONSTANTS } from '../../utils/constants';

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || QUIZ_APP_CONSTANTS.COMMON.debounceSeconds);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
