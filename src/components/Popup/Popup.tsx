import React, { useRef, FunctionComponent } from "react";

import cx from "classnames";

import { useOnClickOutside } from "../../utils/hooks";

import styles from "./Popup.module.css";

interface Props {
  isVisible: boolean;
  changeVisibility(): any;
  positionClassName?: string;
}

export const Popup: FunctionComponent<Props> = ({
  isVisible,
  children,
  changeVisibility = () => null,
  positionClassName = undefined
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(divRef, () => changeVisibility());
  return (
    <div>
      {isVisible && <div className={styles.glass} />}
      {isVisible && (
        <div ref={divRef} className={cx(styles.contextMenu, positionClassName)}>
          {children}
        </div>
      )}
    </div>
  );
};
