import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React from "react";
import defaultProfile from "assets/images/profile.svg";
import { getTimeCount } from "lib/timeCount";
import MarkDown from "components/common/MarkDown";
import useAnswer from "hooks/answer/useAnswer";
import EditMenu from "components/common/EditMenu";
import { FiMoreHorizontal } from "react-icons/fi";
import { IAnswer } from "types/answer/answer.type";
import Portal from "components/common/Portal";
import DelayUnmount from "components/common/DelayUnmount";
import Modal from "components/common/Modal";
import DeleteAnswerModal from "../DeleteAnswerModal";
import HandleAnswer from "../HandleAnswer";
import useModal from "hooks/util/useModal";

const styles = require("./AnswerItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type AnswerItemType = {
  questionUserIdx: number;
  answer: IAnswer;
};

const AnswerItem: React.FC<AnswerItemType> = ({ questionUserIdx, answer }) => {
  const {
    show,
    edit,
    content,
    contentRef,
    clickRef,
    menuRef,
    profile,
    showMenuHandler,
    editModeHandler,
    cancelHandler,
    changeContentHandler,
    updateAnswerHandler,
    deleteAnswerHandler,
  } = useAnswer(answer);
  const { isModalMount, modalMountHandler } = useModal();
  const { user, createdAt, updatedAt, commentCount } = answer;
  const { idx: userIdx, avatar, name } = user;

  return (
    <React.Fragment>
      <Portal>
        <DelayUnmount delay={500} isMount={isModalMount}>
          <Modal isMount={isModalMount} mountHandler={modalMountHandler}>
            <DeleteAnswerModal
              handler={deleteAnswerHandler}
              cancel={modalMountHandler}
            />
          </Modal>
        </DelayUnmount>
      </Portal>
      <div className={cx("answer-item")}>
        <div className={cx("answer-item-header")}>
          <div className={cx("answer-item-header-container")}>
            <img
              src={avatar || defaultProfile}
              alt="Profile"
              className={cx("answer-item-header-container-avatar")}
            />
            <p className={cx("answer-item-header-container-info")}>
              <span>{name}</span>님이 {getTimeCount(answer.updatedAt)}에 작성한
              답변
              {commentCount > 0 && ` · ${commentCount}개의 댓글`}
              {createdAt !== updatedAt && ` · ${getTimeCount(updatedAt)} 수정`}
            </p>
          </div>
          <div className={cx("answer-item-header-area")}>
            {questionUserIdx === userIdx && (
              <p className={cx("answer-item-header-area-role")}>작성자</p>
            )}
            {profile && profile.idx === userIdx && !edit && (
              <React.Fragment>
                <div
                  ref={clickRef}
                  className={cx("answer-item-header-area-more")}
                  onClick={() => showMenuHandler()}
                >
                  <FiMoreHorizontal
                    className={cx("answer-item-header-area-more-icon")}
                  />
                </div>
                {show && (
                  <EditMenu
                    menuRef={menuRef}
                    editHandler={editModeHandler}
                    deleteHandler={modalMountHandler}
                  />
                )}
              </React.Fragment>
            )}
          </div>
        </div>
        {edit ? (
          <div className={cx("answer-item-edit")}>
            <HandleAnswer
              edit={true}
              content={content}
              contentRef={contentRef}
              changeContentHandler={changeContentHandler}
              completeHandler={updateAnswerHandler}
              cancelHandler={cancelHandler}
            />
          </div>
        ) : (
          <div className={cx("answer-item-wrapper")}>
            <MarkDown>{answer.content}</MarkDown>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AnswerItem;
