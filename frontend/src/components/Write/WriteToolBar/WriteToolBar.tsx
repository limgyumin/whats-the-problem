import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FaHeading, FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";

const styles = require("./WriteToolBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type WriteToolBarProps = {
  headingToolsHandler: (scale: number) => void;
  toolsHandler: (mode: string) => void;
};

const WriteToolBar: React.FC<WriteToolBarProps> = ({
  headingToolsHandler,
  toolsHandler,
}) => {
  return (
    <div className={cx("write-toolbar")}>
      {[1, 2, 3, 4].map((heading, idx) => (
        <button
          key={idx}
          className={cx("write-toolbar-button")}
          onClick={() => headingToolsHandler(heading)}
        >
          <div className={cx("write-toolbar-button-heading")}>
            <FaHeading className={cx("write-toolbar-button-heading-icon")} />
            <p className={cx("write-toolbar-button-heading-number")}>
              {heading}
            </p>
          </div>
        </button>
      ))}
      <div className={cx("write-toolbar-divide")} />
      <button
        className={cx("write-toolbar-button")}
        onClick={() => toolsHandler("bold")}
      >
        <FaBold className={cx("write-toolbar-button-icon")} />
      </button>
      <button
        className={cx("write-toolbar-button")}
        onClick={() => toolsHandler("italic")}
      >
        <FaItalic className={cx("write-toolbar-button-icon")} />
      </button>
      <button
        className={cx("write-toolbar-button")}
        onClick={() => toolsHandler("strike")}
      >
        <FaStrikethrough className={cx("write-toolbar-button-icon")} />
      </button>
    </div>
  );
};

export default WriteToolBar;
