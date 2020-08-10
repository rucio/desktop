import { currentUserMountPoint, parsePath } from "../Utils/Files";

const currentDirectory = currentUserMountPoint();

function directoryReducer(state = currentDirectory, action) {
  switch (action.type) {
    case "CD":
      const newDir = parsePath(state) + "/" + action.folder;
      return parsePath(newDir);
    default:
      return state;
  }
}

export default directoryReducer;
