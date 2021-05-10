import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ICreateTag } from "types/tag/tag.type";
import HandleSubmitTags from "./HandleSubmitTags";
import HandleSubmitThumbnail from "./HandleSubmitThumbnail";
import HandleSubmitTitle from "./HandleSubmitTitle";
import HandleSubmitURL from "./HandleSubmitURL";

const styles = require("./HandleSubmitModal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitModalProps = {
  isPost: boolean;
  title: string;
  thumbnail: string;
  tags: ICreateTag[];
  imageRef: React.MutableRefObject<HTMLInputElement>;
  url: string;
  isMount: boolean;
  mountHandler: () => void;
  submitHandler: () => Promise<void>;
  changeThumbnailHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  removeThumbnailHandler: () => void;
};

const HandleSubmitModal: React.FC<HandleSubmitModalProps> = ({
  isPost,
  title,
  thumbnail,
  tags,
  imageRef,
  url,
  isMount,
  mountHandler,
  submitHandler,
  changeThumbnailHandler,
  removeThumbnailHandler,
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
            <div className={cx("handle-submit-modal-box-wrapper-content-area")}>
              <div
                className={cx(
                  "handle-submit-modal-box-wrapper-content-area-main"
                )}
              >
                <HandleSubmitTitle title={title} />
                <HandleSubmitTags tags={tags} />
              </div>
              {isPost && (
                <HandleSubmitThumbnail
                  imageRef={imageRef}
                  thumbnail={thumbnail}
                  changeThumbnailHandler={changeThumbnailHandler}
                  removeThumbnailHandler={removeThumbnailHandler}
                />
              )}
            </div>
            <HandleSubmitURL url={url} />
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
              onClick={() => submitHandler()}
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
