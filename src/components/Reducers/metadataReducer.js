import { readableBytes } from "../Utils/Metadata";

const fileMeta = {};

 function metadataReducer(state = fileMeta, action) {
  switch (action.type) {
    case "GET_META":
      const didMetadata = action.payload;
      const newState = {
        account: didMetadata.account,
        name: didMetadata.name,
        bytes: readableBytes(didMetadata.bytes),
        scope: didMetadata.scope,
        length: didMetadata.length,
        type: didMetadata.type
      }
      return newState;
    case "CLEAR_META":
      return {};
    default:
      return state;
  }
}

export default metadataReducer;
