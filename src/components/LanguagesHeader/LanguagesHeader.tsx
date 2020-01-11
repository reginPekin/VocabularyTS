import React, { useState, FunctionComponent } from "react";

import { InputButton } from "../InputButton";

import styles from "./LanguagesHeader.module.css";

interface Props {
  onForeignChange?: (value: string) => any;
  onNativeChange?: (value: string) => any;
  foreignLanguage: string;
  nativeLanguage: string;
}

export const LanguagesHeader: FunctionComponent<Props> = ({
  foreignLanguage,
  nativeLanguage,
  onForeignChange = () => null,
  onNativeChange = () => null
}) => {
  const [foreignVisibility, setForeignVisibility] = useState<boolean>(true);
  const [nativeVisibility, setNativeVisibility] = useState<boolean>(true);

  return (
    <tr>
      <th>
        <InputButton
          inputClassName={styles.elements}
          buttonClassName={styles.elements}
          text={foreignLanguage}
          isVisible={foreignVisibility}
          changeVisibility={visibility => setForeignVisibility(visibility)}
          onChange={value => onForeignChange(value)}
        />
      </th>
      <th>
        <InputButton
          inputClassName={styles.elements}
          buttonClassName={styles.elements}
          text={nativeLanguage}
          isVisible={nativeVisibility}
          changeVisibility={visibility => setNativeVisibility(visibility)}
          onChange={value => onNativeChange(value)}
        />
      </th>
    </tr>
  );
};
