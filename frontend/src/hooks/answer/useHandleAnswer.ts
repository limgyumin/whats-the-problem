import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { IWindowSize } from "types/util/util.type";

const useHandleAnswer = (
  content: string,
  contentRef: React.MutableRefObject<HTMLTextAreaElement>,
  changeContentHandler: (content: string) => void,
  completeHandler: () => Promise<void>
) => {
  const [preview, setPreview] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const contentFocusHandler = useCallback((): void => {
    setTimeout(() => {
      contentRef.current.focus();
    }, 0);
  }, [contentRef]);

  const writeModeHandler = useCallback((): void => {
    setPreview(false);
    contentFocusHandler();
  }, [setPreview, contentFocusHandler]);

  const previewModeHandler = useCallback((): void => {
    setPreview(true);
  }, [setPreview]);

  const setSelectionPos = useCallback(
    (start: number, end: number): void => {
      setTimeout(() => {
        contentRef.current.focus();
        contentRef.current.setSelectionRange(start, end);
      }, 0);
    },
    [contentRef]
  );

  const contentKeyDownHandler = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
      const pressed = e.key;
      const shiftKey = e.shiftKey;

      if (pressed === "Tab") {
        e.preventDefault();
        const current = contentRef.current;

        const startPos: number = current.selectionStart;
        const endPos: number = current.selectionEnd;

        const startContent: string = current.value.substring(0, startPos);
        const endContent: string = current.value.substring(startPos);

        changeContentHandler(`${startContent}\t${endContent}`);
        setSelectionPos(startPos + 1, endPos + 1);

        return;
      }

      if ((pressed === "Enter" || pressed === "NumpadEnter") && !shiftKey) {
        e.preventDefault();
        await completeHandler();

        return;
      }
    },
    [contentRef, changeContentHandler, setSelectionPos, completeHandler]
  );

  const increaseContentScrollHandler = useCallback((): void => {
    if (contentRef.current) {
      contentRef.current.style.height = "0px";

      const scrollHeight: number = contentRef.current.scrollHeight;
      contentRef.current.style.height = scrollHeight + "px";
    }
  }, [contentRef]);

  const resizeWindowHandler = useCallback((): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setWindowSize]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [content, windowSize, preview, increaseContentScrollHandler]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindowHandler);
    return () => {
      window.removeEventListener("resize", resizeWindowHandler);
    };
  }, [resizeWindowHandler]);

  return {
    preview,
    writeModeHandler,
    previewModeHandler,
    changeContentHandler,
    contentKeyDownHandler,
  };
};

export default useHandleAnswer;
