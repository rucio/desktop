const initialState = false;

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_TRUE":
      return true;
    case "LOADING_FALSE":
      return false;
    default:
      return false;
  }
}
