export const setSearchText = (searchText: string) => {
  return {
    type: "CHANGE_SEARCH_TEXT",
    searchText
  };
};

export const setSortType = (sortType: string) => {
  return {
    type: "SET_SORT_TYPE",
    sortType
  };
};

export const setHookBeam = () => {
  return { type: "SET_HOOK_BEAM" };
};

export const setSortDirection = () => {
  return { type: "SET_SORT_DIRECTION" };
};
