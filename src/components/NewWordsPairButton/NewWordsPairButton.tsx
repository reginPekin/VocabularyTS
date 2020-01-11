import React, { FunctionComponent } from "react";

import styles from "./NewWordsPairButton.module.css";

// import Plus from "../../images/darkPlus.png";

import { Button } from "../Button";

interface Props {
  changeVisibility?: () => any;
  isOpened: boolean;
}

export const NewWordsPairButton: FunctionComponent<Props> = ({
  changeVisibility = () => null,
  isOpened
}) => {
  if (isOpened) return null;

  return (
    <tr>
      <td colSpan={2} className={styles.colSpan}>
        <Button
          buttonClassName={styles.newFolderButton}
          onClick={() => changeVisibility()}
        >
          <section className={styles.section}>
            {/* <img src={Plus} alt="Plus" width={17} height={17} /> */}
            <span>Add new words pair</span>
          </section>
        </Button>
      </td>
    </tr>
  );
};
