import React, { useState, useRef, FunctionComponent } from "react";

import Plus from "../../images/blackPlus.png";

import { Button } from "../Button";
import { Popup } from "../Popup";

import { dropInputRefValues } from "../../utils";

import styles from "./NewFolder.module.css";

interface Props {
  onAdd: (folderName: string, foreignInput: string, nativeInput: string) => any;
}

export const NewFolder: FunctionComponent<Props> = ({ onAdd }) => {
  const [isVisible, setIsVisible] = useState(false);
  const changeVisibility = (changedVisibility: boolean) => {
    setIsVisible(changedVisibility);
  };

  const folderNameRef = useRef<HTMLInputElement | null>(null);
  const foreignInputRef = useRef<HTMLInputElement | null>(null);
  const nativeInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <Button
        onClick={() => changeVisibility(!isVisible)}
        buttonClassName={styles.newFolderButton}
      >
        <section className={styles.span}>
          <img src={Plus} alt="Plus" width={15} />
          <span> Add folder </span>
        </section>
      </Button>
      <Popup
        positionClassName={styles.popup}
        isVisible={isVisible}
        changeVisibility={() => changeVisibility(!isVisible)}
      >
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (foreignInputRef && foreignInputRef.current)
              foreignInputRef.current.focus();
          }}
        >
          <span>Name of the folder:</span>
          <input className={styles.input} ref={folderNameRef} autoFocus />
        </form>

        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (nativeInputRef && nativeInputRef.current)
              nativeInputRef.current.focus();
          }}
        >
          <span>Foreign language:</span>
          <input className={styles.input} ref={foreignInputRef} />
        </form>

        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (
              !foreignInputRef.current ||
              !nativeInputRef.current ||
              !folderNameRef.current
            ) {
              return;
            }

            onAdd(
              folderNameRef.current.value,
              foreignInputRef.current.value,
              nativeInputRef.current.value
            );
            dropInputRefValues(foreignInputRef, nativeInputRef, folderNameRef);
            setIsVisible(false);
          }}
        >
          <span>Native language:</span>
          <input className={styles.input} ref={nativeInputRef} />
        </form>
      </Popup>
    </>
  );
};
