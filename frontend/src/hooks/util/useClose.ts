import React, { useCallback, useEffect } from "react";

const useClose = <T extends HTMLElement>(
  clickRef: React.MutableRefObject<T>,
  targetRef: React.MutableRefObject<T>,
  handler: () => void
): void => {
  const closeHandler = useCallback(
    (e: MouseEvent): void => {
      const { target } = e;

      if (
        targetRef.current &&
        !targetRef.current.contains(target as Node) &&
        !clickRef.current.contains(target as Node)
      ) {
        handler();
      }
    },
    [clickRef, targetRef, handler]
  );

  useEffect(() => {
    window.addEventListener("mousedown", closeHandler);
    return () => window.removeEventListener("mousedown", closeHandler);
  }, [closeHandler]);
};

export default useClose;
