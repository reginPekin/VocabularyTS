import React, { useState, FunctionComponent } from "react";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";
import { Button } from "../Button";
import { Popup } from "../Popup";

import { RepeatIcon, SearchIcon } from "../Icons";

import { setSearchText } from "../../utils/smallActions";
import { State } from "../../redux/reducers";
import { Word } from "../../sdk/types";

interface Props {
  words: Word[];
  name: string;
  sortMethod?: string;
  sortDirection?: number;
  isSearched?: (wordId: string) => any;
  onClick?: () => any;
  onRename?: (value: string) => any;
  onSort?: (sortType: any, sortDirection: number) => any;
}
interface ReduxProps {
  searchText?: string;
}

export const InfoBoxContainer: FunctionComponent<Props & ReduxProps> = ({
  words,
  name,
  sortMethod = "date",
  sortDirection = 1,
  searchText = "",
  isSearched = () => null,
  onSort = () => null,
  onClick = () => 1,
  onRename = () => null
}) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState<boolean>(true);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

  const changeVisibility = (visibility: boolean) => setVisibility(visibility);
  const changePopupVisibility = () => setPopupVisibility(!popupVisibility);

  let defaultValue = ""; // определяй через функцию йо

  switch (sortMethod) {
    case "date":
      defaultValue = "Date";
      break;
    case "foreign":
      defaultValue = "Foreign words";
      break;
    case "native":
      defaultValue = "Native words";
      break;
    case "speech":
      defaultValue = "Speech parts";
      break;
    default:
      console.log("none");
  }

  const options = [
    { value: "date", label: "Date" },
    { value: "foreign", label: "Foreign words" },
    { value: "native", label: "Native words" },
    { value: "speech", label: "Speech parts" }
  ];

  return (
    <div className={styles.infoBox}>
      <Popup
        positionClassName={styles.popup}
        isVisible={popupVisibility}
        changeVisibility={changePopupVisibility}
      >
        <form
          className={styles.popupForm}
          onSubmit={event => {
            dispatch(setSearchText(""));
            event.preventDefault();
          }}
        >
          <input
            className={styles.popupInput}
            onChange={event => {
              dispatch(setSearchText(event.target.value));
            }}
            autoFocus
            value={searchText}
          />
          {/* eslint-disable-next-line array-callback-return */}
          {words.map((word, key) => {
            if (
              searchText !== "" &&
              (word.foreignWord
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1 ||
                word.nativeWord
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) !== -1)
            ) {
              return (
                <div
                  key={key}
                  className={styles.searchedWord}
                  onClick={() => {
                    isSearched(word.wordId);
                    dispatch(setSearchText(""));
                    changePopupVisibility();
                  }}
                >
                  {word.foreignWord} – {word.nativeWord}
                </div>
              );
            }
          })}
        </form>
      </Popup>
      <InputButton
        isVisible={visibility}
        changeVisibility={visibility => changeVisibility(visibility)}
        onChange={value => onRename(value)}
        text={name}
        inputClassName={styles.inputClassName}
        formClassName={styles.formClassName}
        buttonClassName={styles.buttonClassName}
      />

      <label className={styles.sort}>
        Sort by:
        <Select
          className={styles.sortSelect}
          options={options}
          onChange={(event: any) => {
            onSort(event.value, sortDirection);
          }}
          defaultValue={{ label: defaultValue, value: sortMethod }}
        />
        <Button
          onClick={() => {
            onClick();
            onSort(sortMethod, sortDirection);
          }}
        >
          <RepeatIcon style={{ transform: "rotate(90deg)" }} />
        </Button>
        <Button onClick={() => changePopupVisibility()}>
          <SearchIcon />
        </Button>
      </label>
    </div>
  );
};

const mapStateProps = (state: State): ReduxProps => ({
  searchText: state.searchTextChanger.searchText
});

export const InfoBox = connect(mapStateProps)(InfoBoxContainer);
