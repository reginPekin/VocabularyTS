import React, { useRef, FunctionComponent } from "react";

import { useOnClickOutside } from "../../utils/hooks";
import { useSelect } from "../../utils/hooks";

import cx from "classnames";

import styles from "./InputButton.module.css";

import { Button } from "../Button";

interface Props {
  isVisible: boolean;
  changeVisibility?: (value: boolean) => any;
  onChange?: (event: any) => any;
  text: string;
  inputClassName?: string;
  buttonClassName?: string;
  formClassName?: string;
}

export const InputButton: FunctionComponent<Props> = ({
  isVisible,
  changeVisibility = () => null,
  onChange = () => null,
  text,
  inputClassName,
  buttonClassName,
  formClassName
}) => {
  if (!isVisible) {
    return (
      <EditingInput
        formClassName={formClassName}
        inputClassName={inputClassName}
        value={text}
        changeVisibility={() => changeVisibility(true)}
        onSubmit={value => onChange(value)}
      />
    );
  }
  return (
    <Button
      onClick={() => changeVisibility(false)}
      buttonClassName={buttonClassName}
    >
      {text}
    </Button>
  );
};

interface InputProps {
  value?: string;
  changeVisibility?: () => any;
  onSubmit?: (value?: string) => any;
  inputClassName?: string;
  formClassName?: string;
}

const EditingInput: FunctionComponent<InputProps> = ({
  value = "",
  changeVisibility = () => null,
  onSubmit = () => null,
  inputClassName,
  formClassName
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useSelect(inputRef);
  useOnClickOutside(inputRef, () => changeVisibility());

  return (
    <form
      className={formClassName}
      onSubmit={event => {
        if (inputRef?.current) {
          onSubmit(inputRef.current.value);
          inputRef.current.value = "";
        }
        changeVisibility();
        event.preventDefault();
      }}
    >
      <input
        className={cx(styles.input, inputClassName)}
        ref={inputRef}
        defaultValue={value}
        autoFocus
      />
    </form>
  );
};
