import { useEffect, useRef } from "react";

export const usePreviousFormatedAmount = (value: string) => {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
