import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ICreateTag } from "types/tag/tag.type";

const styles = require("./InputTagItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputTagItemProps = {
  tag: ICreateTag;
  removeTagHandler: (tagName: string) => void;
};

const InputTagItem: React.FC<InputTagItemProps> = ({
  tag,
  removeTagHandler,
}) => {
  return (
    <div
      className={cx("input-tag-item")}
      onClick={() => removeTagHandler(tag.name)}
    >
      <p className={cx("input-create-header-tags-list-item-name")}>
        {tag.name}
      </p>
    </div>
  );
};

export default InputTagItem;
