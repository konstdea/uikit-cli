const fs = require('fs');

/**
 * Check is directory att the path
 * @param path
 * @returns {boolean}
 */
function isDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

/**
 * Check is file at the path
 * @param path
 * @returns {boolean}
 */
function isFile(path) {
  return fs.lstatSync(path).isFile();
}

/**
 * Rename file at the path
 * @param destPath - path of the file
 * @param currentName - current filename
 * @param finalName - future filename
 */
function renameFile({destPath, currentName, finalName}) {
  fs.renameSync(path.resolve(destPath, currentName), path.resolve(destPath, finalName));
}

module.exports = {
  isFile,
  isDirectory,
  renameFile
};

