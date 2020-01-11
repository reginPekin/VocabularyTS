import React, { useRef, FunctionComponent } from "react";

import cx from "classnames";

import { useOnClickOutside } from "../../utils/hooks";

import styles from "./Popup.module.css";

interface Props {
  isVisible: boolean;
  positionClassName?: string;
  changeVisibility?: () => any;
}

export const Popup: FunctionComponent<Props> = ({
  isVisible,
  children,
  positionClassName,
  changeVisibility = () => null
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(divRef, () => changeVisibility());

  return (
    <div>
      {isVisible && (
        <>
          <div className={styles.glass} />
          <div
            ref={divRef}
            className={cx(styles.contextMenu, positionClassName)}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};
