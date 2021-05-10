import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import DelayUnmount from "components/common/DelayUnmount";
import HandleSubmitModal from "./HandleSubmitModal";
import HandleCreateHeader from "./HandleCreateHeader";
import HandleToolBar from "../common/ToolBar";
import HandleCreateContent from "./HandleCreateContent";
import HandlePreview from "./HandlePreview";
import HandleBottom from "./HandleBottom";
import InputTags from "./InputTags";
import InputTitle from "./InputTitle";
import useHandle from "hooks/handle/useHandle";
import useModal from "hooks/util/useModal";

const styles = require("./Handle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Handle = () => {
  const {
    isPost,
    isValid,
    isPassed,
    thumbnail,
    imageRef,
    titleRef,
    contentRef,
    request,
    changeHandler,
    changeUrlHandler,
    changeThumbnailHandler,
    changeContentHandler,
    removeThumbnailHandler,
    scrollToolBarHandler,
    contentFocusHandler,
    contentKeyDownHandler,
    goBackHandler,
    submitHandler,
  } = useHandle();

  const { isModalMount, modalMountHandler } = useModal();

  const { title, content, tags, url } = request;

  return (
    <React.Fragment>
      <DelayUnmount isMount={isModalMount} delay={500}>
        <HandleSubmitModal
          isPost={isPost}
          title={title}
          thumbnail={thumbnail}
          tags={tags}
          url={url}
          imageRef={imageRef}
          isMount={isModalMount}
          mountHandler={modalMountHandler}
          submitHandler={submitHandler}
          changeThumbnailHandler={changeThumbnailHandler}
          removeThumbnailHandler={removeThumbnailHandler}
        />
      </DelayUnmount>
      <div className={cx("handle")}>
        <div className={cx("handle-content")}>
          <div className={cx("handle-content-wrapper")}>
            <HandleCreateHeader isPassed={isPassed}>
              <InputTitle
                titleRef={titleRef}
                title={title}
                changeHandler={changeHandler}
                changeUrlHandler={changeUrlHandler}
              />
              <InputTags tags={tags} />
            </HandleCreateHeader>
            <div
              className={cx("handle-content-wrapper-toolbar", {
                passed: isPassed,
              })}
            >
              <HandleToolBar
                contentRef={contentRef}
                changeContentHandler={changeContentHandler}
              />
            </div>
            <HandleCreateContent
              content={content}
              contentRef={contentRef}
              changeHandler={changeHandler}
              contentFocusHandler={contentFocusHandler}
              contentKeyDownHandler={contentKeyDownHandler}
              scrollToolBarHandler={scrollToolBarHandler}
            />
          </div>
          <HandlePreview title={title} content={content} />
        </div>
        <HandleBottom
          isValid={isValid}
          goBackHandler={goBackHandler}
          modalMountHandler={modalMountHandler}
        />
      </div>
    </React.Fragment>
  );
};

export default Handle;
