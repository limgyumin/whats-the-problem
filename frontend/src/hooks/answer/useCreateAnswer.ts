import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createAnswerState } from "atom/answer.atom";
import { IWindowSize } from "types/util/util.type";
import { useMutation } from "@apollo/client";
import { ICreateAnswerResult } from "types/answer/answer.result";
import { CREATE_ANSWER } from "graphql/answer/answer.mutation";
import { IQuestion } from "types/question/question.type";
import { questionState } from "atom/question.atom";
import { useToasts } from "react-toast-notifications";
import useFetchAnswers from "./useFetchAnswers";

const useCreateAnswer = () => {
  const { addToast } = useToasts();
  const { fetchAnswers } = useFetchAnswers();

  const [content, setContent] = useRecoilState<string>(createAnswerState);
  const question = useRecoilValue<IQuestion>(questionState);

  const [preview, setPreview] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [createAnswer] = useMutation<ICreateAnswerResult>(CREATE_ANSWER);

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const changeContentHandler = useCallback(
    (content: string): void => {
      setContent(content);
    },
    [setContent]
  );

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setContent(value);
    },
    [setContent]
  );

  const contentFocusHandler = useCallback((): void => {
    setTimeout(() => {
      contentRef.current.focus();
    }, 0);
  }, [contentRef]);

  const changeWriteMode = useCallback((): void => {
    setPreview(false);
    contentFocusHandler();
  }, [setPreview, contentFocusHandler]);

  const changePreviewMode = useCallback((): void => {
    setPreview(true);
  }, [setPreview]);

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
    (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      const pressed = e.key;

      if (pressed === "Tab") {
        e.preventDefault();
        const current = contentRef.current;

        const startPos: number = current.selectionStart;
        const endPos: number = current.selectionEnd;

        const startContent: string = current.value.substring(0, startPos);
        const endContent: string = current.value.substring(startPos);

        changeContentHandler(`${startContent}\t${endContent}`);
        setSelectionPos(startPos + 1, endPos + 1);
      }
    },
    [contentRef, changeContentHandler, setSelectionPos]
  );

  const submitAnswerHandler = useCallback(async (): Promise<void> => {
    try {
      const { data } = await createAnswer({
        variables: { questionIdx: question.idx, content: content },
      });

      if (data) {
        addToast(
          "성공적으로 답변을 작성했어요. 당신의 답변은 분명 도움이 될 거에요!",
          { appearance: "success" }
        );
        fetchAnswers();
      }
    } catch (error) {
      addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [question, content, addToast, fetchAnswers, createAnswer]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [content, windowSize, preview, increaseContentScrollHandler]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindowHandler);
    return () => {
      window.removeEventListener("resize", resizeWindowHandler);
    };
  }, [resizeWindowHandler]);

  useEffect(() => {
    return () => {
      setContent("");
      setPreview(false);
      setWindowSize({ width: 0, height: 0 });
    };
  }, [setContent]);

  return {
    preview,
    content,
    contentRef,
    changeHandler,
    changeContentHandler,
    changeWriteMode,
    changePreviewMode,
    contentKeyDownHandler,
    submitAnswerHandler,
  };
};

export default useCreateAnswer;
