import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { memo } from "react";

const styles = require("./Input.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type InputProps = {
  name: string;
  value: string;
  type?: string;
  placeholder: string;
  maxLength?: number;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: string | undefined;
};

const Input: React.FC<InputProps> = ({
  name,
  value,
  type,
  placeholder,
  maxLength,
  onChangeHandler,
  warning,
}) => {
  return (
    <div className={cx("input")}>
      <h4 className={cx("input-text")}>{name}</h4>
      <input
        value={value || ""}
        type={type || "text"}
        placeholder={placeholder}
        maxLength={maxLength || 255}
        onChange={(e) => onChangeHandler(e)}
        className={cx("input-element")}
      />
      {warning && <h4 className={cx("input-warning")}>{warning}</h4>}
    </div>
  );
};

export default memo(Input);
