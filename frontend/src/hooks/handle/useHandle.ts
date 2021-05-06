import React, { useMemo, useRef } from "react";
import { isEmpty } from "lib/isEmpty";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { initialCreateQuestion } from "types/question/question.initial-state";
import { ICreateQuestion } from "types/question/question.type";
import { useRecoilState, useRecoilValue } from "recoil";
import { IUserShortInfo } from "types/user/user.type";
import { myProfileState } from "atom/auth.atom";
import { createURL } from "lib/createURL";
import { ICreateQuestionResult } from "types/question/question.result.type";
import { useMutation } from "@apollo/client";
import { CREATE_QUESTION } from "graphql/question/question.mutation";
import { useToasts } from "react-toast-notifications";
import { createQuestionState } from "atom/question.atom";
import { WindowSize } from "types/util.type";
import useQueryString from "hooks/util/useQueryString";
import { ICreatePostResult } from "types/post/post.result.type";
import { CREATE_POST } from "graphql/post/post.mutation";

const useHandle = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();
  const id: string = useQueryString("id");

  const [request, setRequest] = useRecoilState<ICreateQuestion>(
    createQuestionState
  );
  const profile = useRecoilValue<IUserShortInfo>(myProfileState);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isPost: boolean = useMemo(
    () => location.pathname.split("/")[2] === "post",
    [location]
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [createPost] = useMutation<ICreatePostResult>(CREATE_POST);
  const [createQuestion] = useMutation<ICreateQuestionResult>(CREATE_QUESTION);

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value, name } = e.target;
      setRequest({ ...request, [name]: value });
    },
    [request, setRequest]
  );

  const changeUrlHandler = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      const { value } = e.target;

      if (profile.id) {
        const url = createURL(profile.id, value);
        setRequest({ ...request, url });
      }
    },
    [profile, request, setRequest]
  );

  const validate = useCallback((): boolean => {
    const { title, content } = request;

    const [emptyTitle, emptyContent] = [isEmpty(title), isEmpty(content)];

    return !(emptyTitle || emptyContent);
  }, [request]);

  const submitQuestionHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    try {
      const { data } = await createQuestion({
        variables: { question: request },
      });

      if (data) {
        addToast("성공적으로 질문 글을 작성했어요. 얼른 해답을 찾길 바라요!", {
          appearance: "success",
        });
        history.push(`/question/${data.createQuestion.url}`);
      }
    } catch (error) {
      addToast("질문 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [history, request, validate, createQuestion, addToast]);

  const goBackHandler = useCallback((): void => {
    history.push("/");
  }, [history]);

  const contentFocusHandler = useCallback((): void => {
    contentRef.current.focus();
  }, [contentRef]);

  const increaseTitleScrollHandler = useCallback((): void => {
    titleRef.current.style.height = "0px";

    const scrollHeight: number = titleRef.current.scrollHeight;
    titleRef.current.style.height = scrollHeight + "px";
  }, [titleRef]);

  const increaseContentScrollHandler = useCallback((): void => {
    contentRef.current.style.height = "0px";

    const scrollHeight: number = contentRef.current.scrollHeight;
    contentRef.current.style.height = scrollHeight + "px";
    contentRef.current.scrollIntoView({ block: "end" });
  }, [contentRef]);

  useEffect(() => {
    increaseTitleScrollHandler();
  }, [request.title, increaseTitleScrollHandler]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [request.content, windowSize.width, increaseContentScrollHandler]);

  useEffect(() => {
    setIsValid(validate());
  }, [request.title, request.content, validate, setIsValid]);

  const resizeWindowHandler = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setWindowSize]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindowHandler);
    return () => {
      window.removeEventListener("resize", resizeWindowHandler);
    };
  }, [resizeWindowHandler]);

  useEffect(() => {
    return () => {
      setRequest(initialCreateQuestion);
      setIsValid(false);
    };
  }, [setRequest]);

  return {
    profile,
    titleRef,
    contentRef,
    request,
    isValid,
    changeHandler,
    changeUrlHandler,
    contentFocusHandler,
    goBackHandler,
    submitQuestionHandler,
  };
};

export default useHandle;
