import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./Modal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type ModalProps = {
  children: React.ReactNode;
  isMount: boolean;
  mountHandler: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, isMount, mountHandler }) => {
  return (
    <div className={cx("modal light")}>
      <div
        className={cx("modal-overlay", {
          appear: isMount,
          disappear: !isMount,
        })}
        onClick={() => mountHandler()}
      />
      <div
        className={cx("modal-box", {
          "rise-up": isMount,
          "rise-down": !isMount,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
