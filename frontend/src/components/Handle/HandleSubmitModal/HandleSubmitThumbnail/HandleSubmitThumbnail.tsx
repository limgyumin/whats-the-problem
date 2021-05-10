import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { CgImage } from "react-icons/cg";

const styles = require("./HandleSubmitThumbnail.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleSubmitThumbnailProps = {
  imageRef: React.MutableRefObject<HTMLInputElement>;
  thumbnail: string;
  changeThumbnailHandler: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  removeThumbnailHandler: () => void;
};

const HandleSubmitThumbnail: React.FC<HandleSubmitThumbnailProps> = ({
  imageRef,
  thumbnail,
  changeThumbnailHandler,
  removeThumbnailHandler,
}) => {
  return (
    <div className={cx("handle-submit-thumbnail")}>
      <div className={cx("handle-submit-thumbnail-wrapper")}>
        {thumbnail ? (
          <div className={cx("handle-submit-thumbnail-wrapper-preview")}>
            <img
              src={thumbnail}
              alt="thumbnail"
              className={cx("handle-submit-thumbnail-wrapper-preview-image")}
            />
            <div
              className={cx("handle-submit-thumbnail-wrapper-preview-buttons")}
            >
              <label
                htmlFor="thumbnail"
                className={cx(
                  "handle-submit-thumbnail-wrapper-preview-buttons-change"
                )}
              >
                재업로드
              </label>
              <button
                className={cx(
                  "handle-submit-thumbnail-wrapper-preview-buttons-cancel"
                )}
                onClick={() => removeThumbnailHandler()}
              >
                제거
              </button>
            </div>
          </div>
        ) : (
          <div className={cx("handle-submit-thumbnail-wrapper-default")}>
            <CgImage
              className={cx("handle-submit-thumbnail-wrapper-default-icon")}
            />
            <label
              htmlFor="thumbnail"
              className={cx("handle-submit-thumbnail-wrapper-default-upload")}
            >
              썸네일 업로드
            </label>
          </div>
        )}
      </div>
      <input
        id="thumbnail"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        ref={imageRef}
        onChange={(e) => changeThumbnailHandler(e)}
      />
    </div>
  );
};

export default HandleSubmitThumbnail;
