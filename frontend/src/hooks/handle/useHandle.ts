import React, { useMemo, useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { IUserShortInfo } from "types/user/user.type";
import { myProfileState } from "atom/auth.atom";
import { createURL } from "lib/createURL";
import { IWindowSize } from "types/util/util.type";
import { useToasts } from "react-toast-notifications";
import { useMutation } from "@apollo/client";
import { ICreateQuestionResult } from "types/question/question.result.type";
import { CREATE_QUESTION } from "graphql/question/question.mutation";
import { isEmpty } from "lib/isEmpty";
import { ICreatePost } from "types/post/post.type";
import { createPostState } from "atom/post.atom";
import { initialCreatePost } from "types/post/post.initial-state";
import * as _ from "lodash";
import { ICreatePostResult } from "types/post/post.result.type";
import { CREATE_POST } from "graphql/post/post.mutation";
import useUpload from "hooks/upload/useUpload";
import { useBeforeunload } from "react-beforeunload";

const useHandle = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { pathname } = useLocation();
  const { imageRef, uploadHandler } = useUpload();

  useBeforeunload((e) => e.preventDefault());

  const [request, setRequest] = useRecoilState<ICreatePost>(createPostState);
  const profile = useRecoilValue<IUserShortInfo>(myProfileState);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const [createPost] = useMutation<ICreatePostResult>(CREATE_POST);
  const [createQuestion] = useMutation<ICreateQuestionResult>(CREATE_QUESTION);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const isPost = useMemo(() => pathname.split("/")[2] === "post", [pathname]);

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { value, name } = e.target;
      setRequest({ ...request, [name]: value });
    },
    [request, setRequest]
  );

  const changeThumbnailHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { files } = e.target;

      const url: string = await uploadHandler(files);
      setThumbnail(url);
      setRequest({ ...request, thumbnail: url });
    },
    [request, setRequest, uploadHandler]
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

  const removeThumbnailHandler = useCallback((): void => {
    setThumbnail("");
    setRequest({ ...request, thumbnail: "" });
  }, [request, setRequest, setThumbnail]);

  const scrollToolBarHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollTop, scrollHeight } = e.currentTarget;
      const passed: boolean = scrollTop > 0 && scrollHeight > 1000;

      setIsPassed(passed);
    },
    [setIsPassed]
  );

  const setSelectionPos = useCallback(
    (start: number, end: number): void => {
      setTimeout(() => {
        contentRef.current.focus();
        contentRef.current.setSelectionRange(start, end);
      }, 0);
    },
    [contentRef]
  );

  const changeContentHandler = useCallback(
    (content: string): void => {
      setRequest({ ...request, content });
    },
    [request, setRequest]
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

  const resizeWindowHandler = useCallback((): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setWindowSize]);

  const validate = useCallback((): boolean => {
    const { title, content } = request;

    const [emptyTitle, emptyContent] = [isEmpty(title), isEmpty(content)];

    return !(emptyTitle || emptyContent);
  }, [request]);

  const deleteRequestThumbnail = useCallback((): ICreatePost => {
    const newRequest: ICreatePost = _.cloneDeep(request);
    delete newRequest.thumbnail;

    return newRequest;
  }, [request]);

  const submitPostHandler = useCallback(async (): Promise<void> => {
    try {
      const { data } = await createPost({
        variables: { post: request },
      });

      if (data) {
        addToast(
          "성공적으로 글을 작성했어요. 당신의 글은 분명 도움이 될 거에요!",
          { appearance: "success" }
        );
        history.push(`/post/${data.createPost.url}`);
      }
    } catch (error) {
      addToast("글 정보를 제출하는 중에 오류가 발생했어요...", {
        appearance: "error",
      });
    }
  }, [request, history, addToast, createPost]);

  const submitQuestionHandler = useCallback(async (): Promise<void> => {
    const request = deleteRequestThumbnail();

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
  }, [history, addToast, createQuestion, deleteRequestThumbnail]);

  const submitHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    isPost ? submitPostHandler() : submitQuestionHandler();
  }, [isPost, validate, submitPostHandler, submitQuestionHandler]);

  useEffect(() => {
    setIsValid(validate());
  }, [request.title, request.content, validate, setIsValid]);

  useEffect(() => {
    increaseTitleScrollHandler();
  }, [request.title, windowSize, increaseTitleScrollHandler]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [request.content, windowSize, increaseContentScrollHandler]);

  useEffect(() => {
    window.addEventListener("resize", resizeWindowHandler);
    return () => {
      window.removeEventListener("resize", resizeWindowHandler);
    };
  }, [resizeWindowHandler]);

  useEffect(() => {
    return () => {
      setRequest(initialCreatePost);
      setThumbnail("");
      setIsPassed(false);
      setIsValid(false);
    };
  }, [setRequest]);

  return {
    isPost,
    isValid,
    isPassed,
    thumbnail,
    profile,
    imageRef,
    titleRef,
    contentRef,
    request,
    changeHandler,
    changeUrlHandler,
    changeThumbnailHandler,
    changeContentHandler,
    removeThumbnailHandler,
    scrollToolBarHandler,
    contentFocusHandler,
    contentKeyDownHandler,
    goBackHandler,
    submitHandler,
  };
};

export default useHandle;
