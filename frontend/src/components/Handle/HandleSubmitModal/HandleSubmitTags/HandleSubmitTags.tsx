import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";
import { ICreateTag } from "types/tag/tag.type";

const styles = require("./HandleSubmitTags.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitTagsProps = {
  tags: ICreateTag[];
};

const HandleSubmitTags: React.FC<HandleSubmitTagsProps> = ({ tags }) => {
  return (
    <div className={cx("handle-submit-tags")}>
      <p className={cx("handle-submit-tags-name")}>태그</p>
      <div className={cx("handle-submit-tags-list")}>
        {tags.map((tag, idx) => (
          <div key={idx} className={cx("handle-submit-tags-list-item")}>
            <p className={cx("handle-submit-tags-list-item-name")}>
              {tag.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandleSubmitTags;
