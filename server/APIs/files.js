const fs = require("fs");

/**
 * Returns the list of files/folders inside a Directory.
 * @param {String} folder Path to file
 * @param {String} mountpoint Mountpoint for Rucio FUSE system
 */
function getFiles(folder, mountpoint = "/ruciofs") {
  let list = [{ name: "." }, { name: ".." }];
  const files = [];
  const folders = [];

  if (fs.statSync(folder).isFile()) return "FILE";
  if (folder === mountpoint) list = [];

  try {
    fs.readdirSync(folder).forEach((file) => {
      const statsObj = fs.statSync(folder + "/" + file);
      statsObj.isFile()
        ? files.push({ name: file, type: "FILE" })
        : folders.push({ name: file, type: "FOLDER" });
    });
  } catch (err) {
    console.log(`[INFO] Folder not found at ${folder}`);
    return null;
  }
  console.log(`[INFO] Files retrieved from ${folder}`);

  list = list.concat(files, folders);
  return list;
}

exports.getFiles = getFiles;
