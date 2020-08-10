import { readableBytes } from "../Utils/Metadata";

const fileMeta = {};

function metadataReducer(state = fileMeta, action) {
  switch (action.type) {
    case "GET_META":
      return {
        account: action.payload.account,
        name: action.payload.name,
        bytes: readableBytes(action.payload.bytes),
        scope: action.payload.scope,
        length: action.payload.length,
        type: action.payload.type,
      };
    case "CLEAR_META":
      return {};
    default:
      return state;
  }
}

export default metadataReducer;
