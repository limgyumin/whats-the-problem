import React, { useCallback, useEffect } from "react";

const useClose = <T extends HTMLElement>(
  ref: React.MutableRefObject<T>,
  handler: () => void
): void => {
  const closeHandler = useCallback(
    (e: MouseEvent): void => {
      const { target } = e;

      if (ref.current && !ref.current.contains(target as Node)) {
        handler();
      }
    },
    [ref, handler]
  );

  useEffect(() => {
    window.addEventListener("mousedown", closeHandler);
    return () => window.removeEventListener("mousedown", closeHandler);
  }, [closeHandler]);
};

export default useClose;
