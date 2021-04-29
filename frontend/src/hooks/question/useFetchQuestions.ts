import { useQuery } from "@apollo/client";
import {
  questionCountState,
  questionPageState,
  questionsState,
} from "atom/question.atom";
import { QUESTIONS } from "graphql/question/question.query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { IQuestionsResult } from "types/question/question.result.type";
import { IQuestion } from "types/question/question.type";
import { useInView } from "react-intersection-observer";
import { FETCH_QUESTIONS_LIMIT } from "constants/fetchLimit";
import { QuestionType } from "enums/question.enum";
import { useLocation } from "react-router";
import useQueryString from "hooks/util/useQueryString";

const useFetchQuestions = () => {
  const { addToast } = useToasts();
  const [lastElRef, inView] = useInView();
  const { search } = useLocation();
  const sort: string = useQueryString("sort");

  const [page, setPage] = useRecoilState<number>(questionPageState);
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.CreatedAt
  );

  const [questionCount, setQuestionCount] = useRecoilState<number>(
    questionCountState
  );
  const [questions, setQuestions] = useRecoilState<IQuestion[]>(questionsState);

  const { loading, data, error } = useQuery<IQuestionsResult>(QUESTIONS, {
    variables: {
      option: { page, limit: FETCH_QUESTIONS_LIMIT },
      questionType,
    },
  });

  const isRecent: boolean = useMemo(() => sort === null, [sort]);

  const fetchResultHandler = useCallback((): void => {
    if (!loading && data) {
      if (data.questions.length > 0) {
        data.questions.map((question: IQuestion) =>
          setQuestions((questions) => [...questions, question])
        );
        setQuestionCount(data.questionCount);
      }
    }

    if (error) {
      addToast("질문 목록을 조회하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [loading, data, error, setQuestions, setQuestionCount, addToast]);

  useEffect(() => {
    fetchResultHandler();
  }, [fetchResultHandler]);

  useEffect(() => {
    setQuestions([]);
    setPage(1);
  }, [search, setQuestions, setPage]);

  useEffect(() => {
    setQuestionType(isRecent ? QuestionType.CreatedAt : QuestionType.Answer);
  }, [sort, isRecent, setQuestionType]);

  useEffect(() => {
    if (inView && !loading && questions.length < questionCount) {
      setPage((page) => page + 1);
    }
  }, [inView, loading, questions, questionCount, setPage]);

  useEffect(() => {
    return () => {
      setQuestions([]);
      setPage(0);
    };
  }, [setQuestions, setPage]);

  return {
    isRecent,
    loading,
    questions,
    lastElRef,
  };
};

export default useFetchQuestions;
