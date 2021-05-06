import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

import DelayUnmount from "components/common/DelayUnmount";
import HandleSubmitModal from "./HandleSubmitModal";
import HandleCreateHeader from "./HandleCreateHeader";
import HandleToolBar from "./HandleToolBar";
import HandleCreateContent from "./HandleCreateContent";
import HandlePreview from "./HandlePreview";
import HandleBottom from "./HandleBottom";

import InputTags from "./InputTags";
import InputTitle from "./InputTitle";
import InputLink from "./InputLink";

import useHandle from "hooks/handle/useHandle";
import useToolBar from "hooks/handle/useToolBar";
import useTag from "hooks/tag/useTag";
import useModal from "hooks/util/useModal";

const styles = require("./Handle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Handle = () => {
  const {
    titleRef,
    contentRef,
    request,
    isValid,
    changeHandler,
    changeUrlHandler,
    contentFocusHandler,
    goBackHandler,
    submitQuestionHandler,
  } = useHandle();
  const {
    imageRef,
    linkRef,
    linkInputRef,
    isInputMount,
    isPassed,
    link,
    changeImageHandler,
    changeLinkHandler,
    submitLinkHandler,
    scrollToolBarHandler,
    linkKeyDownHandler,
    toolsHandler,
    contentKeyDownHandler,
  } = useToolBar(contentRef);
  const {
    tagName,
    changeTagHandler,
    updateTagHandler,
    removeTagHandler,
  } = useTag();
  const { isModalMount, modalMountHandler } = useModal();

  const { title, content, tags, url } = request;

  return (
    <React.Fragment>
      <DelayUnmount isMount={isModalMount} delay={500}>
        <HandleSubmitModal
          title={title}
          tags={tags}
          url={url}
          isMount={isModalMount}
          mountHandler={modalMountHandler}
          submitQuestionHandler={submitQuestionHandler}
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
              <InputTags
                tagName={tagName}
                tags={tags}
                changeTagHandler={changeTagHandler}
                updateTagHandler={updateTagHandler}
                removeTagHandler={removeTagHandler}
              />
            </HandleCreateHeader>
            <HandleToolBar
              isInputMount={isInputMount}
              isPassed={isPassed}
              imageRef={imageRef}
              toolsHandler={toolsHandler}
              changeImageHandler={changeImageHandler}
              inputLink={
                <InputLink
                  linkRef={linkRef}
                  linkInputRef={linkInputRef}
                  link={link}
                  changeLinkHandler={changeLinkHandler}
                  submitLinkHandler={submitLinkHandler}
                  linkKeyDownHandler={linkKeyDownHandler}
                />
              }
            />
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
