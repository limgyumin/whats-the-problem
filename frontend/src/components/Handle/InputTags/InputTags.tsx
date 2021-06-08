import React from "react";
import { ClassNamesFn } from "classnames/types";
import classNames from "classnames";
import { ICreateTag } from "types/tag/tag.type";
import InputTagItem from "./InputTagItem";
import useTag from "hooks/tag/useTag";

const styles = require("./InputTags.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputTagsProps = {
  tags: ICreateTag[];
};

const InputTags: React.FC<InputTagsProps> = ({ tags }) => {
  const {
    tagName,
    changeTagHandler,
    updateTagHandler,
    removeTagHandler,
  } = useTag();

  return (
    <div className={cx("input-tags")}>
      <div className={cx("input-tags-list")}>
        {tags.map((tag, idx) => (
          <InputTagItem
            key={idx}
            tag={tag}
            removeTagHandler={removeTagHandler}
          />
        ))}
      </div>
      <input
        type="text"
        value={tagName}
        placeholder="태그를 입력해주세요"
        className={cx("input-tags-insert")}
        onChange={(e) => changeTagHandler(e)}
        onKeyDown={(e) => updateTagHandler(e)}
      />
    </div>
  );
};

export default InputTags;
