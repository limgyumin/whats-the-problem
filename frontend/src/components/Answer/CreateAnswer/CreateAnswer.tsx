import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import HandleToolBar from "components/common/ToolBar";
import useCreateAnswer from "hooks/answer/useCreateAnswer";
import MarkDown from "components/common/MarkDown";

const styles = require("./CreateAnswer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const CreateAnswer = () => {
  const {
    preview,
    content,
    contentRef,
    changeHandler,
    changeContentHandler,
    changeWriteMode,
    changePreviewMode,
    contentKeyDownHandler,
    submitAnswerHandler,
  } = useCreateAnswer();

  return (
    <div className={cx("create-answer")}>
      <div className={cx("create-answer-container")}>
        <div className={cx("create-answer-container-action")}>
          <button
            className={cx("create-answer-container-action-write", {
              "mode-active": !preview,
            })}
            onClick={() => changeWriteMode()}
          >
            작성
          </button>
          <button
            className={cx("create-answer-container-action-preview", {
              "mode-active": preview,
            })}
            onClick={() => changePreviewMode()}
          >
            미리보기
          </button>
        </div>
        {!preview && (
          <HandleToolBar
            contentRef={contentRef}
            changeContentHandler={changeContentHandler}
          />
        )}
      </div>
      <div className={cx("create-answer-wrapper")}>
        {preview ? (
          <MarkDown className={cx("create-answer-wrapper-preview")}>
            {content}
          </MarkDown>
        ) : (
          <textarea
            ref={contentRef}
            value={content}
            placeholder="답변을 작성해주세요"
            className={cx("create-answer-wrapper-content")}
            onChange={(e) => changeHandler(e)}
            onKeyDown={(e) => contentKeyDownHandler(e)}
          />
        )}
        <div className={cx("create-answer-wrapper-button")}>
          <button
            className={cx("create-answer-wrapper-button-submit")}
            onClick={() => submitAnswerHandler()}
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnswer;
