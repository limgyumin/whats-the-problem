import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import ToolBar from "components/common/ToolBar";
import MarkDown from "components/common/MarkDown";
import useHandleAnswer from "hooks/answer/useHandleAnswer";

const styles = require("./HandleAnswer.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleAnswerProps = {
  edit?: boolean;
  content: string;
  contentRef: React.MutableRefObject<HTMLTextAreaElement>;
  changeContentHandler: (content: string) => void;
  completeHandler: () => Promise<void>;
  cancelHandler?: () => void;
};

const HandleAnswer: React.FC<HandleAnswerProps> = ({
  edit,
  content,
  contentRef,
  changeContentHandler,
  completeHandler,
  cancelHandler,
}) => {
  const {
    preview,
    writeModeHandler,
    previewModeHandler,
    contentKeyDownHandler,
  } = useHandleAnswer(
    content,
    contentRef,
    changeContentHandler,
    completeHandler
  );

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
            onChange={({ target: { value } }) => changeContentHandler(value)}
            onKeyDown={(e) => contentKeyDownHandler(e)}
          />
        )}
        <div className={cx("handle-answer-wrapper-button")}>
          <button
            className={cx("handle-answer-wrapper-button-submit")}
            onClick={() => completeHandler()}
          >
            {edit ? "수정하기" : "작성하기"}
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
