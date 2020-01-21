import React, { useEffect, useState, FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import { mount, route } from "navi";

import styles from "./VocabularyWindow.module.css";

import { InfoBox } from "../InfoBox";
import { NewWordsPairButton } from "../NewWordsPairButton";
import { PairOfWords } from "../PairOfWords";
import { LanguagesHeader } from "../LanguagesHeader";
import { NewWordsPair } from "../NewWordsPair";

import {
  setSortType,
  setHookBeam,
  setSortDirection
} from "../../utils/smallActions";

import * as sdk from "../../sdk";
import { Folder, SpeechPart } from "../../sdk/types";

interface Props {
  folderRequest: Folder;
  sortDirection: number;
  sortType: string;
}

// renders the main part of the app
const VocabularyWindow: FunctionComponent<Props> = ({
  folderRequest,
  sortDirection,
  sortType
}) => {
  const dispatch = useDispatch();

  const [folder, setFolder] = useState<Folder>(folderRequest);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [activeWordsPairId, setActiveWordPairId] = useState<string>("");
  const [isDoubleClicked, setIsDoubleClicked] = useState<boolean>(false);

  useEffect(() => setFolder(folderRequest), [folderRequest]);

  useEffect(() => {
    setIsDoubleClicked(false);

    document.addEventListener("keydown", listenKeyboard);
    return () => document.removeEventListener("keydown", listenKeyboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWordsPairId]);

  // finds the id of a next pair
  const findNextPairId = (activeIndex: number, direction: string) => {
    const nextIndex = direction === "up" ? activeIndex - 1 : activeIndex + 1;
    const frontierIndex = direction === "up" ? folder.words.length - 1 : 0;

    return folder.words[nextIndex]
      ? folder.words[nextIndex].wordId
      : folder.words[frontierIndex].wordId;
  };

  // executes commands on keys pressed
  const listenKeyboard = (event: KeyboardEvent) => {
    const activeIndex = folder.words.findIndex(
      element => element.wordId === activeWordsPairId
    );

    if (event.key === "ArrowUp") {
      const nextId = findNextPairId(activeIndex, "up");
      setActiveWordPairId(nextId);
      setIsDoubleClicked(false);
      return;
    }
    if (event.key === "ArrowDown") {
      const nextId = findNextPairId(activeIndex, "down");
      setActiveWordPairId(nextId);
      setIsDoubleClicked(false);
      return;
    }
    if (event.key === "Space") {
      if (!activeWordsPairId) {
        return;
      }
      setIsDoubleClicked(!isDoubleClicked);
      return;
    }
  };

  return (
    <main className={styles.vocabularyWindow}>
      <InfoBox
        sortDirection={sortDirection}
        sortMethod={sortType}
        // className={styles.InfoBox}
        name={folder.name}
        onRename={newName => {
          sdk.renameFolder(folder.id, newName).then(() => {
            setFolder({ ...folder, name: newName });
            dispatch(setHookBeam());
          });
        }}
        onSort={(sortType, sortDirection) => {
          sdk.getWordsArray(folder.id, sortType, sortDirection).then(data => {
            setFolder({ ...folder, words: data.words });
            dispatch(setSortType(sortType));
          });
        }}
        onClick={() => dispatch(setSortDirection())}
      />
      <table className={styles.table}>
        <tbody>
          <LanguagesHeader
            foreignLanguage={folder.foreignLanguage}
            nativeLanguage={folder.nativeLanguage}
            onForeignChange={value =>
              sdk
                .changeLanguage(folder.id, value, "foreign")
                .then(() => setFolder({ ...folder, foreignLanguage: value }))
            }
            onNativeChange={value =>
              sdk
                .changeLanguage(folder.id, value, "native")
                .then(() => setFolder({ ...folder, nativeLanguage: value }))
            }
          />
          {folder.words.map(wordPair => (
            <PairOfWords
              // folderId={folder.id}
              wordPair={wordPair}
              onClick={() => {
                setActiveWordPairId(wordPair.wordId);
                setIsDoubleClicked(false);
              }}
              // setActiveWordPairId={setActiveWordPairId}
              emptyState={() => setActiveWordPairId("")}
              activeWordsPairId={activeWordsPairId}
              key={wordPair.wordId}
              isContextOpen={
                wordPair.wordId === activeWordsPairId && isDoubleClicked
              }
              onDoubleClick={() => setIsDoubleClicked(true)}
              // onDelete={() => {
              //   sdk.deleteWordsPair(folder.id, wordPair.wordId).then(() => {
              //     const newWords = folder.words.filter(
              //       words => words.wordId !== wordPair.wordId
              //     );
              //     setFolder({ ...folder, words: newWords });
              //   });
              // }}
              // onEditWord={(value, language) => {
              //   const newName = {
              //     word: language,
              //     wordId: wordPair.wordId,
              //     id: folder.id,
              //     renamedWord: value
              //   };
              //   sdk.editWord(newName).then(() =>
              //     setFolder({
              //       ...folder,
              //       words: folder.words.map(words => {
              //         if (words.wordId === wordPair.wordId) {
              //           if (language === "foreign") words.foreignWord = value;
              //           else if (language === "native")
              //             words.nativeWord = value;
              //         }
              //         return words;
              //       })
              //     })
              //   );
              // }}
              // onEditSpeechPart={value => {
              //   const newSpeechPart = {
              //     id: folder.id,
              //     wordId: wordPair.wordId,
              //     newSpeechPart: value
              //   };
              //   sdk.editSpeechPart(newSpeechPart).then(() =>
              //     setFolder({
              //       ...folder,
              //       words: folder.words.map(words => {
              //         if (words.wordId === wordPair.wordId) {
              //           words.speechPart = value;
              //         }
              //         return words;
              //       })
              //     })
              //   );
              // }}
            />
          ))}

          <NewWordsPairButton
            isOpened={isOpened}
            changeVisibility={() => setIsOpened(!isOpened)}
          />
        </tbody>
      </table>
      <NewWordsPair
        isOpened={isOpened}
        changeVisibility={() => setIsOpened(!isOpened)}
        onAdd={(
          foreignWord: string,
          nativeWord: string,
          speechPartObject: SpeechPart
        ) => {
          let speechPart: string = speechPartObject.value;
          sdk
            .createNewWord({
              folderId: folder.id,
              foreignWord,
              nativeWord,
              speechPart
            })
            .then((data: any) => {
              const newWord = data.data;
              setFolder({ ...folder, words: [...folder.words, newWord] });
            });
        }}
      />
    </main>
  );
};

export default mount({
  "/:id": route({
    async getView(request, context: any) {
      // console.log(request, context);
      try {
        const folder = await sdk.getWordsArray(
          request.params.id,
          context.sortType,
          context.sortDirection
        );

        return (
          <VocabularyWindow
            folderRequest={folder}
            sortType={context.sortType}
            sortDirection={context.sortDirection}
          />
        );
      } catch (error) {
        return <div>{error}</div>;
      }
    }
  })
});
