import { useEffect } from "react";

// handles argument function on click outside

export const useOnClickOutside = (ref: any, handler = () => null) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

export const useSelect = (ref: any) => {
  useEffect(() => {
    if (ref.current && ref) ref.current.select();
  }, [ref]);
};
