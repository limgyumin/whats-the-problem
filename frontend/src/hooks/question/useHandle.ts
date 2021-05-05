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
import { IUploadResult } from "types/upload/upload.result";

const useHandle = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [request, setRequest] = useState<ICreateQuestion>(
    initialCreateQuestion
  );
  const [tagName, setTagName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isModalMount, setIsModalMount] = useState<boolean>(false);
  const [isInputMount, setIsInputMount] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

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

  const findExistTag = useCallback(
    (tagName): ICreateTag => {
      const { tags } = request;

      return tags.find((tag) => tag.name === tagName);
    },
    [request]
  );

  const updateTagHandler = useCallback(
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

  const changeContentHandler = useCallback(
    (content: string): void => {
      setRequest({ ...request, content });
    },
    [request, setRequest]
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

  const linkMountHandler = useCallback((): void => {
    setIsInputMount(true);

    setTimeout(() => {
      linkRef.current.focus();
    }, 0);
  }, [linkRef, setIsInputMount]);

  const changeLinkHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setLink(value);
    },
    [setLink]
  );

  const submitLinkHandler = useCallback(() => {
    const current = contentRef.current;

    const startPos: number = current.selectionStart;
    const endPos: number = current.selectionEnd;

    const content: string = current.value;

    const textBefore: string = content.substring(0, startPos);
    const textAfter: string = content.substring(endPos);

    const selected: string = content.substring(startPos, endPos);

    let linkText: string = selected;

    if (linkText.length === 0) {
      linkText = "링크 텍스트";
    }

    changeContentHandler(`${textBefore}[${linkText}](${link})${textAfter}`);
    setSelectionPos(startPos + 1, startPos + linkText.length + 1);
    setLink("");
    setIsInputMount(false);
  }, [
    contentRef,
    link,
    setIsInputMount,
    changeContentHandler,
    setSelectionPos,
  ]);

  const initImageValue = useCallback((): void => {
    imageRef.current.value = "";
  }, [imageRef]);

  const changeImageHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { files } = e.target;

      if (!files || !files.length) return;

      const current = contentRef.current;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const textBefore: string = content.substring(0, startPos);
      const textAfter: string = content.substring(endPos);

      try {
        const file: File = files[0];

        const { data }: IUploadResult = await uploadImage(file);
        const url: string = data.files[0];

        const imageText: string = `![](${url})`;

        changeContentHandler(`${textBefore}${imageText}${textAfter}`);
        setSelectionPos(startPos, startPos + imageText.length);

        initImageValue();
      } catch (error) {
        addToast("이미지를 업로드하는 중에 오류가 발생했어요...", {
          appearance: "error",
        });
      }
    },
    [changeContentHandler, setSelectionPos, addToast, initImageValue]
  );

  const toolsHandler = useCallback(
    (mode: string, scale?: number) => {
      const current = contentRef.current;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const slicedContent: string = content.slice(0, startPos);
      const lastNewLineIdx: number = slicedContent.lastIndexOf("\n");

      // 전체의 시작부터 selection이 존재하는 부분 중에 마지막 \n의 index까지 (\n 기준 앞 부분, 전체의 앞 부분)
      const textLineBefore: string = slicedContent.slice(0, lastNewLineIdx + 1);
      // 마지막 \n의 index부터 전체의 마지막까지 (\n 기준 뒷 부분)
      const textLineAfter: string = content.slice(
        lastNewLineIdx + 1,
        content.length
      );

      let currentNewLineIdx: number = textLineAfter.indexOf("\n");

      if (currentNewLineIdx === -1) {
        currentNewLineIdx = textLineAfter.length;
      }

      // 뒷 부분의 시작부터 첫 \n의 index 까지 (전체의 중간 부분)
      const lineText: string = textLineAfter.slice(0, currentNewLineIdx);
      // 뒷 부분의 첫 \n의 index부터 마지막까지 (전체의 뒷 부분)
      const textLineBelow: string = textLineAfter.slice(
        currentNewLineIdx,
        textLineAfter.length
      );

      const textBefore: string = content.substring(0, startPos);
      const textAfter: string = content.substring(endPos);

      const selected: string = content.substring(startPos, endPos);

      // toolbar에 존재하는 많은 handler들을 하나의 object에서 key형식으로 관리
      const handlers: { [key: string]: Function } = {
        heading: (): void => {
          const characters: string = "#".repeat(scale);
          const posScaleDiff: number = scale + 1;

          const isHeading: boolean = /^#{1,6} /.test(lineText);

          if (isHeading) {
            const replaced: string = lineText.replace(
              /^#{1,6} /,
              `${characters} `
            );

            const posDiff: number = replaced.length - lineText.length;

            changeContentHandler(
              `${textLineBefore}${replaced}${textLineBelow}`
            );
            setSelectionPos(startPos + posDiff, endPos + posDiff);
            return;
          }

          changeContentHandler(
            `${textLineBefore}${characters} ${lineText}${textLineBelow}`
          );
          setSelectionPos(startPos + posScaleDiff, endPos + posScaleDiff);
        },

        bold: (): void => {
          const isBold: boolean = /\*\*(.*)\*\*/.test(selected);

          if (isBold) {
            const replaced: string = selected.replace(/\*\*/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 4);
            return;
          }

          if (selected.length === 0) {
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

          if (selected.length === 0) {
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

          if (selected.length === 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}~~${sample}~~${textAfter}`);
            setSelectionPos(startPos + 2, startPos + sample.length + 2);
            return;
          }

          changeContentHandler(`${textBefore}~~${selected}~~${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 4);
        },

        blockquote: (): void => {
          const isBlockQuote: boolean = /^> /.test(lineText);

          if (isBlockQuote) {
            const replaced: string = lineText.replace(/^> /, "");

            const posDiff: number = replaced.length - lineText.length;

            changeContentHandler(
              `${textLineBefore}${replaced}${textLineBelow}`
            );
            setSelectionPos(startPos + posDiff, endPos + posDiff);
            return;
          }

          changeContentHandler(
            `${textLineBefore}> ${lineText}${textLineBelow}`
          );
          setSelectionPos(startPos + 2, endPos + 2);
          return;
        },

        link: (): void => {
          linkMountHandler();
        },

        codeblock: (): void => {
          if (selected.length === 0) {
            const sample: string = "코드 입력";

            changeContentHandler(
              `${textBefore}\`\`\`\n${sample}\n\`\`\`${textAfter}`
            );
            setSelectionPos(startPos + 4, startPos + sample.length + 4);
            return;
          }

          changeContentHandler(
            `${textBefore}\`\`\`\n${lineText}\n\`\`\`${textAfter}`
          );
          setSelectionPos(startPos + 4, startPos + selected.length + 4);
        },
      };

      const handler: Function = handlers[mode];
      if (!handler || (mode === "heading" && !scale)) return;

      handler();
    },
    [changeContentHandler, setSelectionPos, linkMountHandler]
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
    increaseTitleScrollHandler();
  }, [request.title, increaseTitleScrollHandler]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [request.content, increaseContentScrollHandler]);

  useEffect(() => {
    setIsValid(validate());
  }, [request.title, request.content, validate, setIsValid]);

  useEffect(() => {
    return () => {
      setRequest(initialCreateQuestion);
      setTagName("");
      setIsInputMount(false);
      setIsModalMount(false);
      setIsValid(false);
    };
  }, [setRequest]);

  return {
    profile,
    titleRef,
    contentRef,
    imageRef,
    linkRef,
    isModalMount,
    isInputMount,
    tagName,
    link,
    request,
    isValid,
    changeHandler,
    changeUrlHandler,
    changeImageHandler,
    changeLinkHandler,
    submitLinkHandler,
    changeTagHandler,
    updateTagHandler,
    removeTagHandler,
    contentFocusHandler,
    goBackHandler,
    modalMountHandler,
    submitQuestionHandler,
    toolsHandler,
    contentKeyDownHandler,
  };
};

export default useHandle;
