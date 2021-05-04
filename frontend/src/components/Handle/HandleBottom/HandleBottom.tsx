import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FiArrowLeft } from "react-icons/fi";

const styles = require("./HandleBottom.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleBottomProps = {
  isValid: boolean;
  goBackHandler: () => void;
  modalMountHandler: () => void;
};

const HandleBottom: React.FC<HandleBottomProps> = ({
  isValid,
  goBackHandler,
  modalMountHandler,
}) => {
  return (
    <div className={cx("handle-bottom")}>
      <div className={cx("handle-bottom-buttons")}>
        <button
          className={cx("handle-bottom-buttons-cancel")}
          onClick={() => goBackHandler()}
        >
          <FiArrowLeft className={cx("handle-bottom-buttons-cancel-icon")} />
        </button>
        <button
          className={cx("handle-bottom-buttons-submit", {
            disable: !isValid,
          })}
          onClick={() => modalMountHandler()}
          disabled={!isValid}
        >
          <p className={cx("handle-bottom-buttons-submit-text")}>작성하기</p>
        </button>
      </div>
    </div>
  );
};

export default HandleBottom;
