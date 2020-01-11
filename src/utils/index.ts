export const dropInputRefValues = (...refs: React.RefObject<any>[]) => {
  refs.forEach(ref => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};

export const activeStyle = (
  activeWordsPairId: string,
  wordsPairId: string
): React.CSSProperties => {
  if (activeWordsPairId === wordsPairId) {
    return {
      backgroundColor: "var(--light-grey)"
    };
  }
  return {};
};

export const clickedStyle = (
  activeWordsPairId: string,
  wordId: string,
  element: string,
  isClicked: boolean
): React.CSSProperties => {
  if (activeWordsPairId === wordId) console.log(isClicked);

  if (activeWordsPairId === wordId && isClicked) {
    if (element === "tdFirst") {
      return {
        borderBottomLeftRadius: "0"
      };
    }
    if (element === "tdSecond") {
      return {
        borderBottomRightRadius: "0px",
        transition: "border-bottom-right-radius 0s linear 1s"
      };
    }
  }

  if (element === "tdFirst") {
    return {
      borderBottomLeftRadius: "13px"
    };
  }
  if (element === "tdSecond") {
    return {
      borderBottomRightRadius: "13px",
      transition: "border-bottom-right-radius 0s linear 1s"
    };
  }
  return {};
};
