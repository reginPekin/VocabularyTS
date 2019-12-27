export interface SortState {
  sortType: string;
  sortDirection: number;
}

const TypeInitialState: SortState = {
  sortType: "date",
  sortDirection: 1
};

export const sortTypeReducer = (
  state: SortState = TypeInitialState,
  action: any
): SortState => {
  switch (action.type) {
    case "SET_SORT_TYPE":
      return { ...state, sortType: action.sortType };
    case "SET_SORT_DIRECTION":
      return { ...state, sortDirection: state.sortDirection * -1 };
    default:
      return state;
  }
};
