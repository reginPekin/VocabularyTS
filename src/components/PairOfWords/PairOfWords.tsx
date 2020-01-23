import React, { useRef, useState, FunctionComponent } from "react";

import styles from "./PairOfWords.module.css";
import cx from "classnames";

import { activeStyle } from "../../utils/index";
import { useOnClickOutside } from "../../utils/hooks";
import { Word } from "../../sdk/types";
import { InputButton } from "../InputButton";

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
  const [tagVisibility, setTagVisibility] = useState<boolean>(true);

  const tableRef = useRef<HTMLTableRowElement | null>(null);

  if (activeWordsPairId === wordPair.wordId && wordPair.tags)
    console.log(wordPair.tags);

  useOnClickOutside(tableRef, () => {
    if (activeWordsPairId !== wordPair.wordId) return;

    emptyState();
  });
  return (
    <tr
      className={cx(styles.trOfWords, {
        [styles.additionOpenedContext]: isContextOpen
      })}
      style={activeStyle(activeWordsPairId, wordPair.wordId)}
      onClick={event => !isContextOpen && onClick(event)}
      onDoubleClick={event => onDoubleClick(event)}
    >
      {!isContextOpen && (
        <>
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
          </td>{" "}
        </>
      )}
      {isContextOpen && (
        <td colSpan={2} className={styles.additionTd}>
          <div
            className={cx(
              { [styles.tdOpenedAddition]: isContextOpen },
              { [styles.tdClosedAddition]: !isContextOpen }
            )}
          >
            <span>
              {wordPair.foreignWord} – {wordPair.nativeWord}
            </span>
            <span>The part of speech: {wordPair.speechPart}</span>
            <InputButton
              text="add tags"
              isVisible={tagVisibility}
              changeVisibility={() => setTagVisibility(!tagVisibility)}
            />
          </div>
        </td>
      )}
    </tr>
  );
};
// return (
//   <tr ref={tableRef} className={styles.additionOpenedContext}>
//     <td colSpan={2} className={styles.additionTd}>
//       <div
//         className={cx(
//           { [styles.tdOpenedAddition]: isContextOpen },
//           { [styles.tdClosedAddition]: !isContextOpen }
//         )}
//       >
//         <span>
//           {wordPair.foreignWord} – {wordPair.nativeWord}
//         </span>
//         <span>The part of speech: {wordPair.speechPart}</span>
//         <InputButton
//           text="add tags"
//           isVisible={tagVisibility}
//           changeVisibility={() => setTagVisibility(!tagVisibility)}
//         />
//       </div>
//     </td>
//   </tr>
// );
// };
