import React, { useState, FunctionComponent } from "react";
import { Link } from "react-navi";

import styles from "./FolderBox.module.css";

import { Button } from "../Button";
import { Popup } from "../Popup";

import { MenuIcon } from "../Icons";
import { Folder } from "../../sdk/types";

interface Props {
  folder: Folder;
  onDelete: () => any;
}

export const FolderBox: FunctionComponent<Props> = ({
  folder,
  onDelete = () => null
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const changeVisibility = () => setIsVisible(!isVisible);

  return (
    <section className={styles.boxFolder}>
      <div className={styles.mainPart}>
        <Link
          href={`/voc/${folder.id}`}
          activeClassName={styles.activeFolder}
          className={styles.link}
        >
          {folder.name}
        </Link>
        <Button
          buttonClassName={styles.button}
          onClick={() => setIsVisible(!isVisible)}
        >
          <MenuIcon />
        </Button>
      </div>
      <Popup
        positionClassName={styles.popup}
        isVisible={isVisible}
        changeVisibility={() => changeVisibility()}
      >
        <Link href="/" className={styles.deleteLink}>
          <Button
            buttonClassName={styles.menuButton}
            onClick={() => {
              onDelete();
              changeVisibility();
            }}
          >
            Delete
          </Button>
        </Link>
        <Button buttonClassName={styles.menuButton}>Edit</Button>
      </Popup>
    </section>
  );
};
