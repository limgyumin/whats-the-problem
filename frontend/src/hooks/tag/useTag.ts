import { createPostState } from "atom/post.atom";
import { isEmpty } from "lib/isEmpty";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ICreatePost } from "types/post/post.type";
import { ICreateTag } from "types/tag/tag.type";

const useTag = () => {
  const [request, setRequest] = useRecoilState<ICreatePost>(createPostState);

  const [tagName, setTagName] = useState<string>("");

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

  useEffect(() => {
    return () => setTagName("");
  }, [setTagName]);

  return {
    tagName,
    changeTagHandler,
    updateTagHandler,
    removeTagHandler,
  };
};

export default useTag;
