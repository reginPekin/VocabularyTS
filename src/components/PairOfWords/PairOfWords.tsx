import React, { useRef, FunctionComponent } from "react";

import styles from "./PairOfWords.module.css";
import cx from "classnames";

import { activeStyle } from "../../utils/index";
import { useOnClickOutside } from "../../utils/hooks";
import { Word } from "../../sdk/types";

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
        className={cx(
          { [styles.additionOpenedContext]: isContextOpen },
          { [styles.additionClosedContext]: !isContextOpen }
        )}
      >
        <td colSpan={2} className={styles.additionTd}>
          <span>The part of speech: {wordPair.speechPart}</span>
        </td>
      </tr>
    </>
  );
};
