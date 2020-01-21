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
