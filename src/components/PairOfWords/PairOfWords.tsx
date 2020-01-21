import React, { useRef, FunctionComponent } from "react";

import styles from "./PairOfWords.module.css";
import cx from "classnames";

import { activeStyle, clickedStyle } from "../../utils/index";
import { useOnClickOutside } from "../../utils/hooks";
import { Word } from "../../sdk/types";
import { NonceProvider } from "react-select";

interface Props {
  activeWordsPairId: string;
  isContextOpen: boolean;
  wordPair: Word;
  onClick?: (event: React.MouseEvent) => any;
  onDoubleClick?: (event: React.MouseEvent) => any;
  emptyState?: () => any;
}

export const PairOfWords: FunctionComponent<Props> = ({
  activeWordsPairId,
  wordPair,
  isContextOpen,
  onClick = () => null,
  emptyState = () => null,
  onDoubleClick = () => null
}) => {
  const tableRef = useRef<HTMLTableRowElement | null>(null);

  useOnClickOutside(tableRef, () => {
    if (activeWordsPairId !== wordPair.wordId) return;

    emptyState();
  });

  if (activeWordsPairId === wordPair.wordId) console.log(isContextOpen);

  return (
    <>
      <tr
        className={styles.trOfWords}
        style={activeStyle(activeWordsPairId, wordPair.wordId)}
        ref={tableRef}
        onClick={event => !isContextOpen && onClick(event)}
        onDoubleClick={event => onDoubleClick(event)}
      >
        <td className={styles.leftChild}>
          <div
            className={cx(
              styles.innerDiv,
              {
                [styles.leftDiv]: isContextOpen
              },
              { [styles.leftBackDiv]: !isContextOpen }
            )}
          >
            {wordPair.foreignWord}
          </div>
        </td>
        <td className={styles.rightChild}>
          <div
            className={cx(
              styles.innerDiv,
              {
                [styles.rightDiv]: isContextOpen
              },
              { [styles.rightBackDiv]: !isContextOpen }
            )}
          >
            {wordPair.nativeWord}
          </div>
        </td>
      </tr>
      <tr
        style={
          isContextOpen
            ? {
                fontSize: "1em",
                height: "50px",
                transition:
                  "height 0.2s ease-out 0s, color 0.3s linear 0s, font-size 0s linear 0.3s"
              }
            : {
                fontSize: "0",
                color: "rgba(0, 0, 0, 0)",
                height: "0",
                transition:
                  "height 0.3s ease-out 0.3s, color 0.3s linear 0.2s, font-size 0s linear 0.3s"
              }
        }
      >
        <td colSpan={2} className={styles.additionTd}>
          <span>The part of speech: {wordPair.speechPart}</span>
        </td>
      </tr>
    </>
  );
};
