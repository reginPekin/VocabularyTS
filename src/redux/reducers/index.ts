import { combineReducers } from "redux";

import searchTextChanger, { SearchState } from "./searchTextChanger";
import hookBeamReducer, { BeamState } from "./hookBeamReducer";
import { sortTypeReducer, SortState } from "./sortTypeReducer";

export interface State {
  hookBeamReducer: BeamState;
  searchTextChanger: SearchState;
  sortTypeReducer: SortState;
}

const rootReducer = combineReducers<State>({
  searchTextChanger,
  hookBeamReducer,
  sortTypeReducer
});

export default rootReducer;
