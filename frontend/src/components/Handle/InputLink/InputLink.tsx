import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./InputLink.scss");
const cx: ClassNamesFn = classNames.bind(styles);

export type InputLinkProps = {
  linkRef: React.MutableRefObject<HTMLInputElement>;
  link: string;
  changeLinkHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitLinkHandler: () => void;
};

const InputLink: React.FC<InputLinkProps> = ({
  linkRef,
  link,
  changeLinkHandler,
  submitLinkHandler,
}) => {
  return (
    <div className={cx("input-link")}>
      <h3 className={cx("input-link-title")}>링크 삽입하기</h3>
      <input
        value={link}
        ref={linkRef}
        type="text"
        placeholder="링크를 입력해주세요."
        className={cx("input-link-insert")}
        onChange={(e) => changeLinkHandler(e)}
      />
      <div className={cx("input-link-submit")}>
        <button
          className={cx("input-link-submit-button")}
          onClick={() => submitLinkHandler()}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default InputLink;
