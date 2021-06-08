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
import InputLink from "components/Handle/InputLink";
import useToolBar from "hooks/handle/useToolBar";

const styles = require("./ToolBar.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type ToolBarProps = {
  contentRef: React.MutableRefObject<HTMLTextAreaElement>;
  changeContentHandler: (content: string) => void;
};

const ToolBar: React.FC<ToolBarProps> = ({
  contentRef,
  changeContentHandler,
}) => {
  const {
    imageRef,
    clickRef,
    linkRef,
    linkInputRef,
    isInputMount,
    link,
    changeImageHandler,
    changeLinkHandler,
    submitLinkHandler,
    linkKeyDownHandler,
    toolsHandler,
  } = useToolBar(contentRef, changeContentHandler);
  return (
    <div className={cx("toolbar")}>
      {[1, 2, 3, 4].map((scale, idx) => (
        <button
          key={idx}
          className={cx("toolbar-button")}
          onClick={() => toolsHandler("heading", scale)}
        >
          <div className={cx("toolbar-button-heading")}>
            <FaHeading className={cx("toolbar-button-heading-icon")} />
            <p className={cx("toolbar-button-heading-number")}>{scale}</p>
          </div>
        </button>
      ))}
      <div className={cx("toolbar-divide")} />
      <button
        className={cx("toolbar-button")}
        onClick={() => toolsHandler("bold")}
      >
        <FaBold className={cx("toolbar-button-icon")} />
      </button>
      <button
        className={cx("toolbar-button")}
        onClick={() => toolsHandler("italic")}
      >
        <FaItalic className={cx("toolbar-button-icon")} />
      </button>
      <button
        className={cx("toolbar-button")}
        onClick={() => toolsHandler("strike")}
      >
        <FaStrikethrough className={cx("toolbar-button-icon")} />
      </button>
      <div className={cx("toolbar-divide")} />
      <button
        className={cx("toolbar-button")}
        onClick={() => toolsHandler("blockquote")}
      >
        <FaQuoteRight className={cx("toolbar-button-icon")} />
      </button>
      <div className={cx("toolbar-wrapper")} ref={clickRef}>
        <button
          className={cx("toolbar-button")}
          onClick={() => toolsHandler("link")}
        >
          <FaLink className={cx("toolbar-button-icon")} />
        </button>
        {isInputMount && (
          <InputLink
            linkRef={linkRef}
            linkInputRef={linkInputRef}
            link={link}
            changeLinkHandler={changeLinkHandler}
            submitLinkHandler={submitLinkHandler}
            linkKeyDownHandler={linkKeyDownHandler}
          />
        )}
      </div>
      <button
        className={cx("toolbar-button")}
        onClick={() => toolsHandler("codeblock")}
      >
        <FaCode className={cx("toolbar-button-icon")} />
      </button>
      <label htmlFor="image" className={cx("toolbar-button")}>
        <FaImage className={cx("toolbar-button-icon")} />
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

export default ToolBar;
