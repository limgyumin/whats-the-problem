import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import MainBanner from "./MainBanner";
import Template from "components/Templates/Template";
import MainQuestions from "./MainQuestions";

const styles = require("./Main.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Main = () => {
  return (
    <div className={cx("main")}>
      <MainBanner />
      <Template>
        <MainQuestions />
      </Template>
    </div>
  );
};

export default Main;
