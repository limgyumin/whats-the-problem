import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { ApolloCache, useMutation } from "@apollo/client";
import { myProfileState } from "atom/auth.atom";
import { questionState } from "atom/question.atom";
import { ANSWERS } from "graphql/answer/answer.query";
import { DELETE_ANSWER, UPDATE_ANSWER } from "graphql/answer/answer.mutation";
import { useToasts } from "react-toast-notifications";
import {
  IDeleteAnswerResult,
  IUpdateAnswerResult,
} from "types/answer/answer.result";
import { IAnswer } from "types/answer/answer.type";
import { IUserShortInfo } from "types/user/user.type";
import { IQuestion } from "types/question/question.type";
import useClose from "hooks/util/useClose";
import { isEmpty } from "lib/isEmpty";
import { removeSpace } from "lib/removeSpace";

const useAnswer = (answer?: IAnswer) => {
  const { addToast } = useToasts();

  const question = useRecoilValue<IQuestion>(questionState);
  const profile = useRecoilValue<IUserShortInfo>(myProfileState);

  const [show, setShow] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const clickRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [updateAnswer] = useMutation<IUpdateAnswerResult>(UPDATE_ANSWER, {
    refetchQueries: [
      { query: ANSWERS, variables: { questionIdx: question.idx } },
    ],
  });
  const [deleteAnswer] = useMutation<IDeleteAnswerResult>(DELETE_ANSWER);

  const changeContentHandler = useCallback(
    (content: string): void => {
      setContent(content);
    },
    [setContent]
  );

  const showMenuHandler = useCallback((): void => {
    setShow(!show);
  }, [show, setShow]);

  useClose<HTMLDivElement>(clickRef, menuRef, showMenuHandler);

  const contentFocusHandler = useCallback((): void => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current.focus();
      }, 0);
    }
  }, [contentRef]);

  const editModeHandler = useCallback((): void => {
    setEdit(!edit);
    setShow(false);
    contentFocusHandler();
  }, [edit, setEdit, setShow, contentFocusHandler]);

  const cancelHandler = useCallback((): void => {
    setEdit(false);
    setContent("");
  }, [setEdit, setContent]);

  const validate = useCallback((): boolean => {
    const emptyContent = isEmpty(content);

    if (emptyContent) {
      addToast("내용을 작성해주세요.", {
        appearance: "warning",
      });
    }

    return !emptyContent;
  }, [content, addToast]);

  const updateAnswerHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    const spaceRemoved: string = removeSpace(content);

    if (!answer) return;

    if (answer.content === spaceRemoved) {
      setEdit(false);
      setContent("");
      return;
    }

    try {
      const { data } = await updateAnswer({
        variables: { idx: answer.idx, content: spaceRemoved },
      });

      if (data) {
        setEdit(false);
        setContent("");
      }
    } catch (error) {
      addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [answer, content, validate, addToast, updateAnswer]);

  const deleteAnswerHandler = useCallback(async (): Promise<void> => {
    if (!answer) return;

    const answerIdx: number = answer.idx;

    try {
      await deleteAnswer({
        variables: { idx: answerIdx },
        update(cache: ApolloCache<IDeleteAnswerResult>) {
          cache.modify({
            fields: {
              answers(existing, { readField }) {
                return existing.filter(
                  (item: any) => answerIdx !== readField("idx", item)
                );
              },
            },
          });
        },
      });
    } catch (error) {
      addToast("답변을 삭제하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [answer, addToast, deleteAnswer]);

  useEffect(() => {
    if (answer) {
      setContent(answer.content);
    }
  }, [edit, answer]);

  useEffect(() => {
    return () => {
      setContent("");
      setShow(false);
      setEdit(false);
    };
  }, []);

  return {
    show,
    edit,
    content,
    contentRef,
    clickRef,
    menuRef,
    profile,
    deleteAnswerHandler,
    showMenuHandler,
    editModeHandler,
    cancelHandler,
    changeContentHandler,
    updateAnswerHandler,
  };
};

export default useAnswer;
