import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./HandleCreateContent.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleCreateContentProps = {
  contentRef: React.MutableRefObject<HTMLTextAreaElement>;
  content: string;
  contentFocusHandler: () => void;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  contentKeyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  scrollToolBarHandler: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const HandleCreateContent: React.FC<HandleCreateContentProps> = ({
  contentRef,
  content,
  contentFocusHandler,
  changeHandler,
  contentKeyDownHandler,
  scrollToolBarHandler,
}) => {
  return (
    <div
      className={cx("handle-create-content")}
      onClick={() => contentFocusHandler()}
      onScroll={(e) => scrollToolBarHandler(e)}
    >
      <textarea
        ref={contentRef}
        value={content}
        name="content"
        className={cx("handle-create-content-textarea")}
        placeholder="무엇이 궁금하신가요? 어떤 것이든 좋아요!"
        onChange={(e) => changeHandler(e)}
        onKeyDown={(e) => contentKeyDownHandler(e)}
      />
    </div>
  );
};

export default HandleCreateContent;
