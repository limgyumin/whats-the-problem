import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ITag } from "types/tag/tag.type";

const styles = require("./TagItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type TagItemProps = {
  tag: ITag;
};

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <div className={cx("tag-item")}>
      <p className={cx("tag-item-name")}>{tag.name}</p>
    </div>
  );
};

export default TagItem;
