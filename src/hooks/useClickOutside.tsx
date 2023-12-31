import { useEffect } from "react";

export default function useClickOutside(
  ref: import("react").MutableRefObject<null | HTMLElement>,
  setState: any
) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref?.current?.contains(e.target)) {
        setState();
      }
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  });
}
