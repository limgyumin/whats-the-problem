import { useCallback, useEffect, useRef, useState } from "react";
import useClose from "hooks/util/useClose";
import { useRecoilValue } from "recoil";
import { IQuestion } from "types/question/question.type";
import { questionState } from "atom/question.atom";
import useFetchAnswers from "./useFetchAnswers";
import { useToasts } from "react-toast-notifications";
import { loginState, myProfileState } from "atom/auth.atom";
import { IWindowSize } from "types/util/util.type";
import {
  CREATE_ANSWER,
  DELETE_ANSWER,
  UPDATE_ANSWER,
} from "graphql/answer/answer.mutation";
import {
  ICreateAnswerResult,
  IDeleteAnswerResult,
  IUpdateAnswerResult,
} from "types/answer/answer.result";
import { useMutation } from "@apollo/client";
import { removeSpace } from "lib/removeSpace";
import { isEmpty } from "lib/isEmpty";
import { IAnswer } from "types/answer/answer.type";
import { IUserShortInfo } from "types/user/user.type";
import useModal from "hooks/util/useModal";

const useAnswer = (answer?: IAnswer) => {
  const { addToast } = useToasts();
  const { isModalMount, modalMountHandler } = useModal();
  const { fetchAnswers } = useFetchAnswers();

  const question = useRecoilValue<IQuestion>(questionState);
  const login = useRecoilValue<boolean>(loginState);
  const profile = useRecoilValue<IUserShortInfo>(myProfileState);

  const [preview, setPreview] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [show, setShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const clickRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [createAnswer] = useMutation<ICreateAnswerResult>(CREATE_ANSWER);
  const [updateAnswer] = useMutation<IUpdateAnswerResult>(UPDATE_ANSWER);
  const [deleteAnswer] = useMutation<IDeleteAnswerResult>(DELETE_ANSWER);

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

  const writeModeHandler = useCallback((): void => {
    setPreview(false);
    contentFocusHandler();
  }, [setPreview, contentFocusHandler]);

  const previewModeHandler = useCallback((): void => {
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

  const validate = useCallback((): boolean => {
    const emptyContent = isEmpty(content);

    if (emptyContent) {
      addToast("내용을 작성해주세요.", {
        appearance: "warning",
      });
    }

    return !emptyContent;
  }, [content, addToast]);

  const showMenuHandler = useCallback((): void => {
    setShow(!show);
  }, [show, setShow]);

  useClose<HTMLDivElement>(clickRef, menuRef, showMenuHandler);

  const editModeHandler = useCallback((): void => {
    setEdit(!edit);
    setShow(false);
    contentFocusHandler();
  }, [edit, setEdit, setShow, contentFocusHandler]);

  const cancelHandler = useCallback((): void => {
    setEdit(false);
    setContent("");
  }, [setEdit, setContent]);

  const submitAnswerHandler = useCallback(async (): Promise<void> => {
    if (!login) {
      addToast("로그인 후 답변을 다실 수 있어요.", {
        appearance: "warning",
      });
      return;
    }

    if (!validate()) return;

    // 내용의 첫 부분과 마지막 부분의 불필요한 공백을 제거
    const spaceRemoved: string = removeSpace(content);

    try {
      const { data } = await createAnswer({
        variables: { questionIdx: question.idx, content: spaceRemoved },
      });

      if (data) {
        addToast(
          "성공적으로 답변을 작성했어요. 당신의 답변은 분명 도움이 될 거에요!",
          { appearance: "success" }
        );
        setContent("");
        fetchAnswers();
      }
    } catch (error) {
      addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [
    login,
    question,
    content,
    validate,
    addToast,
    fetchAnswers,
    createAnswer,
  ]);

  const updateAnswerHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    const spaceRemoved: string = removeSpace(content);

    if (answer) {
      try {
        const { data } = await updateAnswer({
          variables: { idx: answer.idx, content: spaceRemoved },
        });

        if (data) {
          fetchAnswers();
        }
      } catch (error) {
        addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
      }
    }
  }, [answer, content, validate, addToast, fetchAnswers, updateAnswer]);

  const deleteAnswerHandler = useCallback(async (): Promise<void> => {
    if (answer) {
      try {
        const { data } = await deleteAnswer({
          variables: { idx: answer.idx },
        });

        if (data) {
          fetchAnswers();
        }
      } catch (error) {
        addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
      }
    }
  }, [answer, fetchAnswers, addToast, deleteAnswer]);

  useEffect(() => {
    if (answer) {
      setContent(answer.content);
    }
  }, [edit, answer]);

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
      setPreview(false);
      setWindowSize({ width: 0, height: 0 });
      setContent("");
      setShow(false);
      setEdit(false);
    };
  }, [setContent]);

  return {
    profile,
    preview,
    content,
    contentRef,
    clickRef,
    menuRef,
    show,
    edit,
    isModalMount,
    modalMountHandler,
    showMenuHandler,
    editModeHandler,
    cancelHandler,
    changeHandler,
    changeContentHandler,
    writeModeHandler,
    previewModeHandler,
    contentKeyDownHandler,
    submitAnswerHandler,
    updateAnswerHandler,
    deleteAnswerHandler,
  };
};

export default useAnswer;
