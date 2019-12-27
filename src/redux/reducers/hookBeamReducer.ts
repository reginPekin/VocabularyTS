export interface BeamState {
  beam: number;
}

const InitialState: BeamState = {
  beam: 0
};

const hookBeamReducer = (
  state: BeamState = InitialState,
  action: any
): BeamState => {
  switch (action.type) {
    case "SET_HOOK_BEAM":
      return { ...state, beam: state.beam + 1 };
    default:
      return state;
  }
};

export default hookBeamReducer;
