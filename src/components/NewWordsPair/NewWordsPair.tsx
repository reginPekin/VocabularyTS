import React, { useRef, FunctionComponent } from "react";
import Select from "react-select";

import styles from "./NewWordsPair.module.css";

import { dropInputRefValues } from "../../utils";
import { useOnClickOutside } from "../../utils/hooks";

interface Props {
  isOpened: boolean;
  changeVisibility?: () => any;
  onAdd?: (foreignValue: string, nativeValue: string, speechPart: any) => any;
}

export const NewWordsPair: FunctionComponent<Props> = ({
  isOpened,
  onAdd = () => null,
  changeVisibility = () => null
}) => {
  const foreignInputRef = useRef<HTMLInputElement | null>(null);
  const nativeInputRef = useRef<HTMLInputElement | null>(null);
  const speechPartRef = useRef<Select | null>(null);
  const datalistRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef(null);

  // console.log(datalistRef);

  useOnClickOutside(formRef, () => {
    changeVisibility();
    dropInputRefValues(foreignInputRef, nativeInputRef);
  });

  const options = [
    { value: "noun", label: "noun" },
    { value: "adjective", label: "adjective", color: "#00B8D9" },
    { value: "verb", label: "verb" },
    { value: "adverb", label: "adverb" },
    { value: "pronoun", label: "pronoun" },
    { value: "preposition", label: "preposition" },
    { value: "conjuction", label: "conjuction" },
    { value: "interjection", label: "interjection" }
  ];

  if (!isOpened) {
    return null;
  }
  return (
    <div ref={formRef} className={styles.newWordsPair}>
      <section className={styles.words}>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (nativeInputRef?.current) nativeInputRef.current.focus();
          }}
        >
          <input
            placeholder="Foreign word"
            className={styles.inputWords}
            ref={foreignInputRef}
            autoFocus
          />
        </form>
        <form
          onSubmit={event => {
            event.preventDefault();
            if (speechPartRef?.current && datalistRef?.current) {
              speechPartRef.current.focus();
              datalistRef.current.focus();
            }
          }}
        >
          <input
            placeholder="Native word"
            className={styles.inputWords}
            ref={nativeInputRef}
          />
        </form>
      </section>
      <section className={styles.additionInfo}>
        <form
          className={styles.form}
          onSubmit={event => {
            event.preventDefault();
            if (
              !foreignInputRef.current ||
              !nativeInputRef.current ||
              !speechPartRef.current
            ) {
              return;
            }
            onAdd(
              foreignInputRef.current.value,
              nativeInputRef.current.value,
              speechPartRef.current.state.value
            );
            dropInputRefValues(foreignInputRef, nativeInputRef, speechPartRef);
            foreignInputRef.current.focus();
          }}
        >
          <Select
            options={options}
            className={styles.select}
            isSearchable
            ref={speechPartRef}
          />
        </form>
      </section>
    </div>
  );
};
