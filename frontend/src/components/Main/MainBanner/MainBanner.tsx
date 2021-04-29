import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import { ReactComponent as Cube } from "assets/images/cube.svg";

const styles = require("./MainBanner.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const MainBanner = () => {
  return (
    <div className={cx("main-banner")}>
      <div className={cx("main-banner-wrapper")}>
        <div className={cx("main-banner-wrapper-content")}>
          <h1 className={cx("main-banner-wrapper-content-title")}>
            서로 문제를 찾고,
            <br />
            해결하는 사람들의 모임
          </h1>
          <p className={cx("main-banner-wrapper-content-description")}>
            What'sTheProblem은 여러분의 개발 분야를 공부하며 겪은 시행착오들이나
            궁금한 것들에 대한 해결방안을 찾아보고, 질문하며, 의논할 수 있는
            작은 공간이에요.
          </p>
        </div>
        <Cube className={cx("main-banner-wrapper-picture")} />
      </div>
    </div>
  );
};

export default MainBanner;
