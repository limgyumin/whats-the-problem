import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ICreateTag } from "types/tag/tag.type";

const styles = require("./WriteTagItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type WriteTagItemProps = {
  tag: ICreateTag;
  removeTagHandler: (tagName: string) => void;
};

const WriteTagItem: React.FC<WriteTagItemProps> = ({
  tag,
  removeTagHandler,
}) => {
  return (
    <div
      className={cx("write-tag-item")}
      onClick={() => removeTagHandler(tag.name)}
    >
      <p className={cx("write-create-header-tags-list-item-name")}>
        {tag.name}
      </p>
    </div>
  );
};

export default WriteTagItem;
