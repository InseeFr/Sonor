import { useCallback, useRef, useState } from "react";

/**
 * useDebouncedState can be used to debounce value updates for given delay.
 *
 * Example Usecase: You have a search field and want to load sugestions.
 * Api should only be called when last user interaction is minimum 300ms ago.
 *
 * Usage: debouncedValue is updated after 500 ms
 * const [value, debouncedValue, setValue] = useDebouncedState("", 500)
 */
export function useDebouncedState<T>(initialValue: T, delay = 300): [T, (v: T) => void] {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const setValue = useCallback(
    (value: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    },
    [delay],
  );

  return [debouncedValue, setValue];
}
