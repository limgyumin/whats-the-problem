import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";

const styles = require("./DeleteAnswerModal.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type DeleteAnswerModalProps = {
  handler: () => Promise<void>;
  cancel: () => void;
};

const DeleteAnswerModal: React.FC<DeleteAnswerModalProps> = ({
  handler,
  cancel,
}) => {
  return (
    <div className={cx("delete-answer-modal")}>
      <h2 className={cx("delete-answer-modal-title")}>답변 삭제하기</h2>
      <p className={cx("delete-answer-modal-subtitle")}>
        정말로 답변을 삭제하시겠어요?
      </p>
      <div className={cx("delete-answer-modal-buttons")}>
        <button
          className={cx("delete-answer-modal-buttons-handle")}
          onClick={() => handler()}
        >
          삭제하기
        </button>
        <button
          className={cx("delete-answer-modal-buttons-cancel")}
          onClick={() => cancel()}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteAnswerModal;
