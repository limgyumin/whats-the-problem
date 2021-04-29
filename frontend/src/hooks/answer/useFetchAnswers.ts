import { useQuery } from "@apollo/client";
import { answersState } from "atom/answer.atom";
import { questionState } from "atom/question.atom";
import { ANSWERS } from "graphql/answer/answer.query";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useRecoilState, useRecoilValue } from "recoil";
import { IAnswersResult } from "types/answer/answer.result";
import { IAnswer } from "types/answer/answer.type";
import { IQuestion } from "types/question/question.type";

const useFetchAnswers = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [answers, setAnswers] = useRecoilState<IAnswer[]>(answersState);
  const question = useRecoilValue<IQuestion>(questionState);

  const { loading, data, error } = useQuery<IAnswersResult>(ANSWERS, {
    variables: { questionIdx: question.idx },
  });

  const fetchResultHandler = useCallback(() => {
    if (!loading && data) {
      setAnswers(data.answers);
    }

    if (error) {
      addToast("답변 목록을 조회하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [loading, data, error, history, addToast, setAnswers]);

  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  useEffect(() => {
    return () => {
      setAnswers([]);
    };
  }, [setAnswers]);

  return {
    loading,
    answers,
    questionUserIdx: question.user.idx,
  };
};

export default useFetchAnswers;
