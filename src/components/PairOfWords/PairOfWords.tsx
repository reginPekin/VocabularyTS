import React, { useRef, FunctionComponent } from "react";

import styles from "./PairOfWords.module.css";
import { activeStyle, clickedStyle } from "../../utils/index";
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

  return (
    <>
      <tr
        className={styles.trOfWords}
        style={activeStyle(activeWordsPairId, wordPair.wordId)}
        ref={tableRef}
        onClick={event => !isContextOpen && onClick(event)}
        onDoubleClick={event => onDoubleClick(event)}
      >
        <td
          style={clickedStyle(
            activeWordsPairId,
            wordPair.wordId,
            "tdFirst",
            isContextOpen
          )}
        >
          {wordPair.foreignWord}
        </td>
        <td
          style={clickedStyle(
            activeWordsPairId,
            wordPair.wordId,
            "tdSecond",
            isContextOpen
          )}
        >
          {wordPair.nativeWord}
        </td>
      </tr>
      <tr
        style={
          isContextOpen
            ? {
                fontSize: "1em",
                height: "50px",
                transition:
                  "height 0.2s ease-out 0s, color 0.1s linear 0s, font-size 0s linear 0.1s"
              }
            : {
                fontSize: "0",
                color: "rgba(0, 0, 0, 0)",
                height: "0",
                transition:
                  "height 0.2s ease-out 0s, color 0.1s linear 0s, font-size 0s linear 0.1s"
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
