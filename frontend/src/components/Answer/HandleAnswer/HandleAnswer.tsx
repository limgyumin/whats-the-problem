import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import ToolBar from "components/common/ToolBar";
import MarkDown from "components/common/MarkDown";

const styles = require("./HandleAnswer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleAnswerProps = {
  edit?: boolean;
  preview: boolean;
  content: string;
  contentRef: React.MutableRefObject<HTMLTextAreaElement>;
  cancelHandler?: () => void;
  changeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeContentHandler: (content: string) => void;
  writeModeHandler: () => void;
  previewModeHandler: () => void;
  contentKeyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  completeHandler: () => Promise<void>;
};

const HandleAnswer: React.FC<HandleAnswerProps> = ({
  edit,
  preview,
  content,
  contentRef,
  cancelHandler,
  changeHandler,
  changeContentHandler,
  writeModeHandler,
  previewModeHandler,
  contentKeyDownHandler,
  completeHandler,
}) => {
  return (
    <div className={cx("handle-answer")}>
      <div className={cx("handle-answer-container")}>
        <div className={cx("handle-answer-container-action")}>
          <button
            className={cx("handle-answer-container-action-write", {
              "mode-active": !preview,
            })}
            onClick={() => writeModeHandler()}
          >
            작성
          </button>
          <button
            className={cx("handle-answer-container-action-preview", {
              "mode-active": preview,
            })}
            onClick={() => previewModeHandler()}
          >
            미리보기
          </button>
        </div>
        {!preview && (
          <ToolBar
            contentRef={contentRef}
            changeContentHandler={changeContentHandler}
          />
        )}
      </div>
      <div className={cx("handle-answer-wrapper")}>
        {preview ? (
          <MarkDown className={cx("handle-answer-wrapper-preview")}>
            {content}
          </MarkDown>
        ) : (
          <textarea
            ref={contentRef}
            value={content}
            placeholder="답변을 작성해주세요"
            className={cx("handle-answer-wrapper-content")}
            onChange={(e) => changeHandler(e)}
            onKeyDown={(e) => contentKeyDownHandler(e)}
          />
        )}
        <div className={cx("handle-answer-wrapper-button")}>
          <button
            className={cx("handle-answer-wrapper-button-submit")}
            onClick={() => completeHandler()}
          >
            작성하기
          </button>
          {edit && (
            <button
              className={cx("handle-answer-wrapper-button-cancel")}
              onClick={() => cancelHandler()}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HandleAnswer;
