import { useState, useEffect, useCallback } from "react";

type IProps<T> = {
  key: string;
  initialValue: T[];
};

export default function useLocalStorage<T>({ key, initialValue }: IProps<T>) {
  const [state, setState] = useState<Set<T>>(
    (() => {
      try {
        const storedValue = localStorage.getItem(key);
        return new Set(storedValue ? JSON.parse(storedValue) : initialValue);
      } catch (e) {
        return new Set(initialValue);
      }
    })()
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(Array.from(state)));
  }, [key, state]);

  const toggleValue = useCallback(
    (item: T) => {
      setState((prevValue) => {
        const newValue = new Set(prevValue);
        newValue.has(item) ? newValue.delete(item) : newValue.add(item);
        return newValue;
      });
    },
    [setState]
  );

  return [state, toggleValue] as const;
}
