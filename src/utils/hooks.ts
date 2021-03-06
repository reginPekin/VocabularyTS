import { useEffect } from "react";

// handles argument function on click outside
export const useOnClickOutside = (
  ref: React.RefObject<any>,
  handler: () => any = () => null
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
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
