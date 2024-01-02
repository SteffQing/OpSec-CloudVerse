import { useState } from "react";

const useSessionStorage = (key: string, value: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const _value = window.sessionStorage.getItem(key);

      if (_value) {
        return _value;
      } else {
        window.sessionStorage.setItem(key, value);
        return value;
      }
    } catch (err) {
      return value;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.sessionStorage.setItem(key, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};

export default useSessionStorage;
