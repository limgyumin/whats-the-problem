import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import useCreateQuestion from "hooks/question/useCreateQuestion";
import DelayUnmount from "components/common/DelayUnmount";
import HandleSubmitModal from "./HandleSubmitModal";
import InputTags from "./InputTags";
import InputTitle from "./InputTitle";
import HandleContent from "./HandleContent";
import HandleCreate from "./HandleCreate";
import HandleCreateHeader from "./HandleCreate/HandleCreateHeader";
import HandleToolBar from "./HandleToolBar";
import HandleCreateContent from "./HandleCreate/HandleCreateContent";
import HandlePreview from "./HandlePreview";
import HandleBottom from "./HandleBottom";

const styles = require("./Handle.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Handle = () => {
  const {
    titleRef,
    contentRef,
    isModalMount,
    tagName,
    request,
    isValid,
    changeHandler,
    changeUrlHandler,
    changeTagHandler,
    updateTagHandler,
    removeTagHandler,
    contentFocusHandler,
    goBackHandler,
    modalMountHandler,
    submitQuestionHandler,
    headingToolsHandler,
    toolsHandler,
    contentKeyDownHandler,
  } = useCreateQuestion();
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
        <HandleContent>
          <HandleCreate>
            <HandleCreateHeader>
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
              headingToolsHandler={headingToolsHandler}
              toolsHandler={toolsHandler}
            />
            <HandleCreateContent
              content={content}
              contentRef={contentRef}
              changeHandler={changeHandler}
              contentFocusHandler={contentFocusHandler}
              contentKeyDownHandler={contentKeyDownHandler}
            />
          </HandleCreate>
          <HandlePreview title={title} content={content} />
        </HandleContent>
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
