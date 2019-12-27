export const dropInputRefValues = (...refs: any) => {
  refs.forEach((ref: any) => {
    if (ref.current && ref.current.value) ref.current.value = "";
  });
};
