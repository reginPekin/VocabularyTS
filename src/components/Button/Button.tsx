import React, { FunctionComponent } from "react";

import cx from "classnames";

import styles from "./Button.module.css";

interface Props {
  buttonClassName?: string;
  onClick?: (event: React.MouseEvent) => any;
  onDoubleClick?: (event: React.MouseEvent) => any;
}

export const Button: FunctionComponent<Props> = ({
  children,
  buttonClassName = undefined,
  onClick = () => null,
  onDoubleClick = () => null
}) => {
  return (
    <button
      className={cx(styles.button, buttonClassName)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </button>
  );
};
