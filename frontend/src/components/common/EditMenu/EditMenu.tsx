import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./EditMenu.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type EditMenuProps = {
  menuRef: React.MutableRefObject<HTMLDivElement>;
  editHandler: () => void;
  deleteHandler: () => void;
};

const EditMenu: React.FC<EditMenuProps> = ({
  menuRef,
  editHandler,
  deleteHandler,
}) => {
  return (
    <div className={cx("edit-menu")} ref={menuRef}>
      <button className={cx("edit-menu-content")} onClick={() => editHandler()}>
        <p className={cx("edit-menu-content-text")}>수정</p>
      </button>
      <button
        className={cx("edit-menu-content")}
        onClick={() => deleteHandler()}
      >
        <p className={cx("edit-menu-content-text")}>삭제</p>
      </button>
    </div>
  );
};

export default EditMenu;
