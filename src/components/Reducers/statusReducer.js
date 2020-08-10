const initialState = null

function statusReducer(state = initialState, action) {
  switch (action.type) {
    case "SUCCESS":
      return 200;
    case "UNAUTHORIZED":
      return 401;
    case "SERVER_ERR":
      return 500;
    default:
      return state;
  }
}

export default statusReducer;
