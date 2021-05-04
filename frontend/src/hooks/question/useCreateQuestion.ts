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

  const changeContentHandler = useCallback(
    (content: string): void => {
      setRequest({ ...request, content });
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
    (tagName: string): void => {
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

  const setSelectionPos = useCallback(
    (start: number, end: number): void => {
      setTimeout(() => {
        contentRef.current.focus();
        contentRef.current.setSelectionRange(start, end);
      }, 0);
    },
    [contentRef]
  );

  const headingToolsHandler = useCallback(
    (scale: number): void => {
      if (scale <= 0 || scale >= 5) return;

      const current = contentRef.current;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const slicedContent: string = content.slice(0, startPos);
      const lastNewLineIdx: number = slicedContent.lastIndexOf("\n");

      // 전체의 시작부터 selection이 존재하는 부분 중에 마지막 \n의 index까지 (\n 기준 앞 부분, 전체의 앞 부분)
      const textBefore: string = slicedContent.slice(0, lastNewLineIdx + 1);
      // 마지막 \n의 index부터 전체의 마지막까지 (\n 기준 뒷 부분)
      const textAfter: string = content.slice(
        lastNewLineIdx + 1,
        content.length
      );

      let currentNewLineIdx: number = textAfter.indexOf("\n");

      if (currentNewLineIdx === -1) {
        currentNewLineIdx = textAfter.length;
      }

      // 뒷 부분의 시작부터 첫 \n의 index 까지 (전체의 중간 부분)
      const selected: string = textAfter.slice(0, currentNewLineIdx);
      // 뒷 부분의 첫 \n의 index부터 마지막까지 (전체의 뒷 부분)
      const textAfterSelected: string = textAfter.slice(
        currentNewLineIdx,
        textAfter.length
      );

      const characters: string = "#".repeat(scale);
      const posScaleDiff: number = scale + 1;

      const isHeading: boolean = /^#{1,6} /.test(selected);

      if (isHeading) {
        const replaced: string = selected.replace(/^#{1,6} /, `${characters} `);

        const posDiff: number = replaced.length - selected.length;

        changeContentHandler(`${textBefore}${replaced}${textAfterSelected}`);
        setSelectionPos(startPos + posDiff, endPos + posDiff);
        return;
      }

      changeContentHandler(
        `${textBefore}${characters} ${selected}${textAfterSelected}`
      );
      setSelectionPos(startPos + posScaleDiff, endPos + posScaleDiff);
    },
    [changeContentHandler, setSelectionPos]
  );

  const toolsHandler = useCallback(
    (mode: string) => {
      const current = contentRef.current;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const textBefore: string = content.substring(0, startPos);
      const textAfter: string = content.substring(endPos);

      const selected: string = content.substring(startPos, endPos);

      // toolbar에 존재하는 많은 handler들을 하나의 object에서 key형식으로 관리
      const handlers: { [key: string]: Function } = {
        bold: (): void => {
          const isBold: boolean = /\*\*(.*)\*\*/.test(selected);

          if (isBold) {
            const replaced: string = selected.replace(/\*\*/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 4);
            return;
          }

          if (selected.length <= 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}**${sample}**${textAfter}`);
            setSelectionPos(startPos + 2, startPos + sample.length + 2);
            return;
          }

          changeContentHandler(`${textBefore}**${selected}**${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 4);
        },

        italic: (): void => {
          const isItalic: boolean = /_(.*)_/.test(selected);

          if (isItalic) {
            const replaced: string = selected.replace(/_/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 2);
            return;
          }

          if (selected.length <= 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}_${sample}_${textAfter}`);
            setSelectionPos(startPos + 1, startPos + sample.length + 1);
            return;
          }

          changeContentHandler(`${textBefore}_${selected}_${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 2);
        },

        strike: (): void => {
          const isBold: boolean = /~~(.*)~~/.test(selected);

          if (isBold) {
            const replaced: string = selected.replace(/~~/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 4);
            return;
          }

          if (selected.length <= 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}~~${sample}~~${textAfter}`);
            setSelectionPos(startPos + 2, startPos + sample.length + 2);
            return;
          }

          changeContentHandler(`${textBefore}~~${selected}~~${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 4);
        },
      };

      const handler: Function = handlers[mode];
      if (!handler) return;

      handler();
    },
    [changeContentHandler, setSelectionPos]
  );

  const contentKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    const { title, content } = request;

    const [emptyTitle, emptyContent] = [isEmpty(title), isEmpty(content)];

    return !(emptyTitle || emptyContent);
  }, [request]);

  const modalMountHandler = useCallback((): void => {
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
  }, [setRequest]);

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
    changeHandler,
    changeUrlHandler,
    changeImageHandler,
    changeTagHandler,
    updateTagsHandler,
    removeTagHandler,
    contentFocusHandler,
    goBackHandler,
    modalMountHandler,
    submitQuestionHandler,
    headingToolsHandler,
    toolsHandler,
    contentKeyDownHandler,
  };
};

export default useCreateQuestion;
