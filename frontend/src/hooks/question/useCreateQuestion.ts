import React, { useRef } from "react";
import { isEmpty } from "lib/isEmpty";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { initialCreateQuestion } from "types/question/question.initial-state";
import { ICreateQuestion } from "types/question/question.type";
import { ICreateTag } from "types/tag/tag.type";
import { useRecoilValue } from "recoil";
import { IUserShortInfo } from "types/user/user.type";
import { myProfileState } from "atom/auth.atom";
import { createURL } from "lib/createURL";
import { uploadImage } from "lib/image";
import { ICreateQuestionResult } from "types/question/question.result.type";
import { useMutation } from "@apollo/client";
import { CREATE_QUESTION } from "graphql/question/question.mutation";
import { useToasts } from "react-toast-notifications";

const useCreateQuestion = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [request, setRequest] = useState<ICreateQuestion>(
    initialCreateQuestion
  );
  const [tagName, setTagName] = useState<string>("");
  const [isModalMount, setIsModalMount] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const profile = useRecoilValue<IUserShortInfo>(myProfileState);

  const [createQuestion] = useMutation<ICreateQuestionResult>(CREATE_QUESTION);

  const changeTitleHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setRequest({ ...request, title: value });
    },
    [request, setRequest]
  );

  const changeContentHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setRequest({ ...request, content: value });
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

  const changeTagHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setTagName(value);
    },
    [setTagName]
  );

  const changeImageHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { files } = e.target;

      if (files && files.length) {
        const file: File = files[0];

        const imageURL: string = await uploadImage(file);
        const imageMDString: string = `\n![image](${imageURL})`;

        setRequest({ ...request, content: request.content + imageMDString });
      }
    },
    [request, setRequest]
  );

  const findExistTag = useCallback(
    (tagName): ICreateTag => {
      const { tags } = request;

      return tags.find((tag) => tag.name === tagName);
    },
    [request]
  );

  const updateTagsHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      const pressed = e.key;

      if ((pressed === "," || pressed === "Enter") && !isEmpty(tagName)) {
        e.preventDefault();
        const existTag: ICreateTag = findExistTag(tagName);

        if (!existTag) {
          setRequest({
            ...request,
            tags: [...request.tags, { name: tagName }],
          });
        }
        setTagName("");
      }

      if (!tagName && pressed === "Backspace") {
        const copiedTags: ICreateTag[] = [...request.tags];
        copiedTags.pop();

        setRequest({ ...request, tags: copiedTags });
      }
    },
    [tagName, request, setTagName, setRequest, findExistTag]
  );

  const removeTagHandler = useCallback(
    (tagName): void => {
      const copiedTags: ICreateTag[] = [...request.tags];

      const existTag: ICreateTag = findExistTag(tagName);
      const tagIdx: number = copiedTags.indexOf(existTag);

      if (tagIdx > -1) {
        copiedTags.splice(tagIdx, 1);
      }

      setRequest({ ...request, tags: copiedTags });
    },
    [request, findExistTag, setRequest]
  );

  const validate = useCallback((): boolean => {
    const { title, content } = request;

    const [emptyTitle, emptyContent] = [isEmpty(title), isEmpty(content)];

    return !(emptyTitle || emptyContent);
  }, [request]);

  const modalMountHandler = useCallback(() => {
    setIsModalMount(!isModalMount);
  }, [isModalMount, setIsModalMount]);

  const submitQuestionHandler = useCallback(async (): Promise<void> => {
    if (!validate()) return;

    try {
      const { data } = await createQuestion({
        variables: { question: request },
      });

      if (data) {
        addToast("성공적으로 질문 글을 작성했어요. 얼른 해답을 찾길 바래요!", {
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
    titleRef.current!.style.height = "0px";

    const scrollHeight: number = titleRef.current!.scrollHeight;
    titleRef.current!.style.height = scrollHeight + "px";
  }, [titleRef]);

  const increaseContentScrollHandler = useCallback((): void => {
    contentRef.current!.style.height = "0px";

    const scrollHeight: number = contentRef.current!.scrollHeight;
    contentRef.current!.style.height = scrollHeight + "px";
  }, [contentRef]);

  useEffect(() => {
    return () => {
      setRequest(initialCreateQuestion);
      setTagName("");
    };
  }, []);

  useEffect(() => {
    increaseTitleScrollHandler();
  }, [request.title, increaseTitleScrollHandler]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [request.content, increaseContentScrollHandler]);

  useEffect(() => {
    setIsValid(validate());
  }, [request.title, request.content, validate, setIsValid]);

  return {
    profile,
    titleRef,
    contentRef,
    isModalMount,
    tagName,
    request,
    isValid,
    changeTitleHandler,
    changeContentHandler,
    changeUrlHandler,
    changeImageHandler,
    changeTagHandler,
    updateTagsHandler,
    removeTagHandler,
    contentFocusHandler,
    goBackHandler,
    modalMountHandler,
    submitQuestionHandler,
  };
};

export default useCreateQuestion;
