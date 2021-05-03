import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useCreateQuestion from "hooks/question/useCreateQuestion";
import MarkDown from "components/common/MarkDown";
import { FiArrowLeft } from "react-icons/fi";
import DelayUnmount from "components/common/DelayUnmount";
import WriteSubmitModal from "../WriteSubmitModal";

const styles = require("./WriteQuestion.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const WriteQuestion = () => {
  const {
    titleRef,
    contentRef,
    isModalMount,
    tagName,
    request,
    isValid,
    changeTitleHandler,
    changeContentHandler,
    changeUrlHandler,
    changeTagHandler,
    updateTagsHandler,
    removeTagHandler,
    contentFocusHandler,
    goBackHandler,
    modalMountHandler,
    submitQuestionHandler,
  } = useCreateQuestion();
  const { title, content, tags, url } = request;

  return (
    <React.Fragment>
      <DelayUnmount isMount={isModalMount} delay={500}>
        <WriteSubmitModal
          title={title}
          tags={tags}
          url={url}
          isMount={isModalMount}
          mountHandler={modalMountHandler}
          submitQuestionHandler={submitQuestionHandler}
        />
      </DelayUnmount>
      <div className={cx("write-question")}>
        <div className={cx("write-question-wrapper")}>
          <div className={cx("write-question-wrapper-left")}>
            <div className={cx("write-question-wrapper-left-header")}>
              <textarea
                ref={titleRef}
                value={title}
                placeholder="제목을 입력해주세요"
                className={cx("write-question-wrapper-left-header-title")}
                onChange={(e) => changeTitleHandler(e)}
                onBlur={(e) => changeUrlHandler(e)}
              />
              <div className={cx("write-question-wrapper-left-header-line")} />
              <div className={cx("write-question-wrapper-left-header-tags")}>
                <div
                  className={cx("write-question-wrapper-left-header-tags-list")}
                >
                  {tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className={cx(
                        "write-question-wrapper-left-header-tags-list-item"
                      )}
                      onClick={() => removeTagHandler(tag.name)}
                    >
                      <p
                        className={cx(
                          "write-question-wrapper-left-header-tags-list-item-name"
                        )}
                      >
                        {tag.name}
                      </p>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagName}
                  placeholder="태그를 입력해주세요"
                  className={cx(
                    "write-question-wrapper-left-header-tags-insert"
                  )}
                  onChange={(e) => changeTagHandler(e)}
                  onKeyDown={(e) => updateTagsHandler(e)}
                />
              </div>
            </div>
            <div
              className={cx("write-question-wrapper-left-content")}
              onClick={() => contentFocusHandler()}
            >
              <textarea
                ref={contentRef}
                value={content}
                className={cx("write-question-wrapper-left-content-textarea")}
                placeholder="무엇이 궁금하신가요? 어떤 것이든 좋아요!"
                onChange={(e) => changeContentHandler(e)}
              />
            </div>
          </div>
          <div className={cx("write-question-wrapper-right")}>
            <h1 className={cx("write-question-wrapper-right-title")}>
              {title}
            </h1>
            <MarkDown>{content}</MarkDown>
          </div>
        </div>
        <div className={cx("write-question-bottom")}>
          <div className={cx("write-question-bottom-buttons")}>
            <button
              className={cx("write-question-bottom-buttons-cancel")}
              onClick={() => goBackHandler()}
            >
              <FiArrowLeft
                className={cx("write-question-bottom-buttons-cancel-icon")}
              />
            </button>
            <button
              className={cx("write-question-bottom-buttons-submit", {
                disable: !isValid,
              })}
              onClick={() => modalMountHandler()}
              disabled={!isValid}
            >
              <p className={cx("write-question-bottom-buttons-submit-text")}>
                작성하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WriteQuestion;
