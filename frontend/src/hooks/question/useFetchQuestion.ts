import { useLazyQuery } from "@apollo/client";
import { questionState } from "atom/question.atom";
import { QUESTION } from "graphql/question/question.query";
import { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { initialQuestion } from "types/question/question.initial-state";
import { IQuestionResult } from "types/question/question.result.type";
import { IQuestion } from "types/question/question.type";

type QuestionParamsType = {
  user: string;
  title: string;
};

const useFetchQuestion = () => {
  const { user, title } = useParams<QuestionParamsType>();

  const history = useHistory();
  const { addToast } = useToasts();

  const [fetchQuestion, { loading, data, error }] = useLazyQuery<
    IQuestionResult
  >(QUESTION);

  const [question, setQuestion] = useRecoilState<IQuestion>(questionState);

  const fetchResultHandler = useCallback((): void => {
    if (!loading && data) {
      setQuestion(data.question);
    }

    if (error) {
      addToast("질문을 조회하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
      history.push("/");
    }
  }, [history, loading, data, error, addToast, setQuestion]);

  useEffect(() => {
    fetchQuestion({ variables: { url: `${user}/${title}` } });
  }, [fetchQuestion, user, title]);

  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  useEffect(() => {
    return () => {
      setQuestion(initialQuestion);
    };
  }, [setQuestion]);

  return {
    question,
  };
};

export default useFetchQuestion;
