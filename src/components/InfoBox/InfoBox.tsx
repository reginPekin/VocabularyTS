import React, { useState, useRef, FunctionComponent } from "react";
import Select from "react-select";
import { connect, useDispatch } from "react-redux";

import styles from "./InfoBox.module.css";

import { InputButton } from "../InputButton";
import { Button } from "../Button";
import { Popup } from "../Popup";

import { RepeatIcon, SearchIcon } from "../Icons";

import { setSearchText } from "../../utils/smallActions";
import { State } from "../../redux/reducers";

interface Props {
  name: string;
  sortMethod: string;
  sortDirection: number;
  onClick?: () => any;
  onRename?: (value: string) => any;
  onSort?: (sortType: string, sortDirection: number) => any;
}
interface ReduxProps {
  searchText: string;
}

export const InfoBoxContainer: FunctionComponent<Props & ReduxProps> = ({
  name,
  sortMethod,
  sortDirection,
  searchText,
  onSort = () => null,
  onClick = () => null,
  onRename = () => null
}) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState<boolean>(true);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const selectRef = useRef<Select | null>(null);

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

  const Voc = [
    "one",
    "two",
    "three",
    "sdfsd",
    "cxmv",
    "dsfl",
    "lcm",
    "dvkci",
    "tiro",
    "pogpf",
    "gbklc"
  ]; // как будет готов поиск, удаляй!

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
              console.log(searchText);
            }}
            autoFocus
            value={searchText}
          />
          {/* eslint-disable-next-line array-callback-return */}
          {Voc.map((word, key) => {
            if (
              searchText !== "" &&
              word.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            ) {
              return (
                <div key={key} className={styles.searchedWord}>
                  {word}
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
          ref={selectRef}
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
            // if (selectRef && selectRef.current)
            // onSort(selectRef.current.state.value, sortDirection); TODO find Select state
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
