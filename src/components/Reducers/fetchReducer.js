const initialState = false;

export function fetchReducer(state = initialState, action) {
  switch (action.type) {
    case "TRIGGER_FETCH":
      return 1;
    case "CANCEL_FETCH":
      return 0;
    default:
      return 0;
  }
}
