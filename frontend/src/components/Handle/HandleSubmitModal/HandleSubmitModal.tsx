import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";
import { ICreateTag } from "types/tag/tag.type";

const styles = require("./HandleSubmitModal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitModalProps = {
  title: string;
  tags: ICreateTag[];
  url: string;
  isMount: boolean;
  mountHandler: () => void;
  submitQuestionHandler: () => Promise<void>;
};

const HandleSubmitModal: React.FC<HandleSubmitModalProps> = ({
  title,
  tags,
  url,
  isMount,
  mountHandler,
  submitQuestionHandler,
}) => {
  return (
    <div className={cx("handle-submit-modal light")}>
      <div
        className={cx("handle-submit-modal-overlay", {
          appear: isMount,
          disappear: !isMount,
        })}
        onClick={() => mountHandler()}
      />
      <div
        className={cx("handle-submit-modal-box", {
          "rise-up": isMount,
          "rise-down": !isMount,
        })}
      >
        <div className={cx("handle-submit-modal-box-wrapper")}>
          <div className={cx("handle-submit-modal-box-wrapper-header")}>
            <h3 className={cx("handle-submit-modal-box-wrapper-header-text")}>
              작성 완료하기
            </h3>
            <div
              className={cx("handle-submit-modal-box-wrapper-header-line")}
            />
          </div>
          <div className={cx("handle-submit-modal-box-wrapper-content")}>
            <div
              className={cx("handle-submit-modal-box-wrapper-content-title")}
            >
              <p
                className={cx(
                  "handle-submit-modal-box-wrapper-content-title-name"
                )}
              >
                제목
              </p>
              <h1
                className={cx(
                  "handle-submit-modal-box-wrapper-content-title-text"
                )}
              >
                {title}
              </h1>
            </div>
            <div className={cx("handle-submit-modal-box-wrapper-content-tags")}>
              <p
                className={cx(
                  "handle-submit-modal-box-wrapper-content-tags-name"
                )}
              >
                태그
              </p>
              <div
                className={cx(
                  "handle-submit-modal-box-wrapper-content-tags-list"
                )}
              >
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className={cx(
                      "handle-submit-modal-box-wrapper-content-tags-list-item"
                    )}
                  >
                    <p
                      className={cx(
                        "handle-submit-modal-box-wrapper-content-tags-list-item-name"
                      )}
                    >
                      {tag.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("handle-submit-modal-box-wrapper-content-url")}>
              <p
                className={cx(
                  "handle-submit-modal-box-wrapper-content-url-name"
                )}
              >
                URL
              </p>
              <h1
                className={cx(
                  "handle-submit-modal-box-wrapper-content-url-text"
                )}
              >
                {url}
              </h1>
            </div>
          </div>
          <div className={cx("handle-submit-modal-box-wrapper-bottom")}>
            <button
              className={cx("handle-submit-modal-box-wrapper-bottom-cancel")}
              onClick={() => mountHandler()}
            >
              취소
            </button>
            <button
              className={cx("handle-submit-modal-box-wrapper-bottom-submit")}
              onClick={() => submitQuestionHandler()}
            >
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleSubmitModal;
