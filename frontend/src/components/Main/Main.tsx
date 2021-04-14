import React from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Main.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Main = () => {
  return (
    <>
      <div className={cx("main")}></div>
    </>
  );
};

export default Main;
