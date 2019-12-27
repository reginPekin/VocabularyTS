export interface SearchState {
  searchText: string;
}

const InitialState: SearchState = {
  searchText: ""
};

const searchTextChanger = (
  state: SearchState = InitialState,
  action: any
): SearchState => {
  switch (action.type) {
    case "CHANGE_SEARCH_TEXT":
      return { ...state, searchText: action.searchText };
    default:
      return state;
  }
};

export default searchTextChanger;
