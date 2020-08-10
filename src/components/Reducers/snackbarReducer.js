const initialState = false;

export function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return true;
    case "HIDE_SNACKBAR":
      return false;
    default:
      return state;
  }
}
