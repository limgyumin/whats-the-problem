import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./InputTitle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputTitleProps = {
  titleRef: React.MutableRefObject<HTMLTextAreaElement>;
  title: string;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeUrlHandler: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const InputTitle: React.FC<InputTitleProps> = ({
  titleRef,
  title,
  changeHandler,
  changeUrlHandler,
}) => {
  return (
    <React.Fragment>
      <textarea
        ref={titleRef}
        value={title}
        name="title"
        placeholder="제목을 입력해주세요"
        className={cx("input-title")}
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => changeUrlHandler(e)}
      />
      <div className={cx("input-line")} />
    </React.Fragment>
  );
};

export default InputTitle;
