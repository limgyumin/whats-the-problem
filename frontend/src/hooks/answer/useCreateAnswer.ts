import { useMutation } from "@apollo/client";
import { loginState } from "atom/auth.atom";
import { questionState } from "atom/question.atom";
import { CREATE_ANSWER } from "graphql/answer/answer.mutation";
import { ANSWERS } from "graphql/answer/answer.query";
import { isEmpty } from "lib/isEmpty";
import { removeSpace } from "lib/removeSpace";
import { useCallback, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilValue } from "recoil";
import { ICreateAnswerResult } from "types/answer/answer.result";
import { IQuestion } from "types/question/question.type";

const useCreateAnswer = () => {
  const { addToast } = useToasts();

  const question = useRecoilValue<IQuestion>(questionState);
  const login = useRecoilValue<boolean>(loginState);

  const [content, setContent] = useState<string>("");

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [createAnswer] = useMutation<ICreateAnswerResult>(CREATE_ANSWER, {
    refetchQueries: [
      { query: ANSWERS, variables: { questionIdx: question.idx } },
    ],
  });

  const changeContentHandler = useCallback(
    (content: string): void => {
      setContent(content);
    },
    [setContent]
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
      }
    } catch (error) {
      addToast("답변 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [login, question, content, validate, addToast, createAnswer]);

  return {
    content,
    contentRef,
    changeContentHandler,
    submitAnswerHandler,
  };
};

export default useCreateAnswer;
