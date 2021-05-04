import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { FaHeading, FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";

const styles = require("./HandleToolBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleToolBarProps = {
  headingToolsHandler: (scale: number) => void;
  toolsHandler: (mode: string) => void;
};

const HandleToolBar: React.FC<HandleToolBarProps> = ({
  headingToolsHandler,
  toolsHandler,
}) => {
  return (
    <div className={cx("handle-toolbar")}>
      {[1, 2, 3, 4].map((heading, idx) => (
        <button
          key={idx}
          className={cx("handle-toolbar-button")}
          onClick={() => headingToolsHandler(heading)}
        >
          <div className={cx("handle-toolbar-button-heading")}>
            <FaHeading className={cx("handle-toolbar-button-heading-icon")} />
            <p className={cx("handle-toolbar-button-heading-number")}>
              {heading}
            </p>
          </div>
        </button>
      ))}
      <div className={cx("handle-toolbar-divide")} />
      <button
        className={cx("handle-toolbar-button")}
        onClick={() => toolsHandler("bold")}
      >
        <FaBold className={cx("handle-toolbar-button-icon")} />
      </button>
      <button
        className={cx("handle-toolbar-button")}
        onClick={() => toolsHandler("italic")}
      >
        <FaItalic className={cx("handle-toolbar-button-icon")} />
      </button>
      <button
        className={cx("handle-toolbar-button")}
        onClick={() => toolsHandler("strike")}
      >
        <FaStrikethrough className={cx("handle-toolbar-button-icon")} />
      </button>
    </div>
  );
};

export default HandleToolBar;
