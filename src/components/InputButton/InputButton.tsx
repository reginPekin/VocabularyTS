import React, { useRef, FunctionComponent } from "react";

import { useOnClickOutside } from "../../utils/hooks";
import { useSelect } from "../../utils/hooks";

import cx from "classnames";

import styles from "./InputButton.module.css";

import { Button } from "../Button";

interface Props {
  visibility: boolean;
  changeVisibility: (event: any) => any;
  onChange: (event: any) => any;
  text: string;
  inputClassName?: string;
  buttonClassName?: string;
  formClassName?: string;
}

export const InputButton: FunctionComponent<Props> = ({
  visibility,
  changeVisibility,
  onChange,
  text,
  inputClassName = undefined,
  buttonClassName = undefined,
  formClassName = undefined
}) => {
  if (!visibility) {
    return (
      <EditingInput
        formClassName={formClassName}
        inputClassName={inputClassName}
        value={text}
        changeVisibility={() => changeVisibility(true)}
        onSubmit={(value?: string) => {
          onChange(value);
        }}
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
  inputClassName = undefined,
  formClassName = undefined
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useSelect(inputRef);
  useOnClickOutside(inputRef, () => changeVisibility());

  return (
    <form
      className={formClassName}
      onSubmit={event => {
        onSubmit(inputRef.current.value);
        changeVisibility();
        inputRef.current.value = "";
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
