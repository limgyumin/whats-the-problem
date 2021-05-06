import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import {
  FaHeading,
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaQuoteRight,
  FaLink,
  FaCode,
  FaImage,
} from "react-icons/fa";

const styles = require("./HandleToolBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleToolBarProps = {
  isInputMount: boolean;
  isPassed: boolean;
  imageRef: React.MutableRefObject<HTMLInputElement>;
  inputLink: React.ReactNode;
  toolsHandler: (mode: string, scale?: number) => void;
  changeImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const HandleToolBar: React.FC<HandleToolBarProps> = ({
  isInputMount,
  isPassed,
  imageRef,
  inputLink,
  toolsHandler,
  changeImageHandler,
}) => {
  return (
    <div className={cx("handle-toolbar", { passed: isPassed })}>
      {[1, 2, 3, 4].map((scale, idx) => (
        <button
          key={idx}
          className={cx("handle-toolbar-button")}
          onClick={() => toolsHandler("heading", scale)}
        >
          <div className={cx("handle-toolbar-button-heading")}>
            <FaHeading className={cx("handle-toolbar-button-heading-icon")} />
            <p className={cx("handle-toolbar-button-heading-number")}>
              {scale}
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
      <div className={cx("handle-toolbar-divide")} />
      <button
        className={cx("handle-toolbar-button")}
        onClick={() => toolsHandler("blockquote")}
      >
        <FaQuoteRight className={cx("handle-toolbar-button-icon")} />
      </button>
      <div className={cx("handle-toolbar-wrapper")}>
        <button
          className={cx("handle-toolbar-button")}
          onClick={() => toolsHandler("link")}
        >
          <FaLink className={cx("handle-toolbar-button-icon")} />
        </button>
        {isInputMount && inputLink}
      </div>
      <button
        className={cx("handle-toolbar-button")}
        onClick={() => toolsHandler("codeblock")}
      >
        <FaCode className={cx("handle-toolbar-button-icon")} />
      </button>
      <label htmlFor="image" className={cx("handle-toolbar-button")}>
        <FaImage className={cx("handle-toolbar-button-icon")} />
      </label>
      <input
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageRef}
        onChange={(e) => changeImageHandler(e)}
      />
    </div>
  );
};

export default HandleToolBar;
