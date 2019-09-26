const path = require('path');
const fs = require('fs');
const {isDirectory, isFile, renameFile} = require('./utils/file-utils');

const dirBoilerplateTs = './templates/boilerplate-ts';
const pathBoilerplateTs = path.resolve(__dirname, dirBoilerplateTs);

module.exports = (args) => {
  if (args._[1] === 'help' || args.help || args.h) {
    return require('./help')(args);
  }

  if (!args._[2]) {
    console.error(`\x1b[1m\x1b[31mComponent name is required!\x1b[0m`);
    return require('./help')(args);
  }

  const currentPath = args.path || args.p || process.cwd();
  const scope = args.s || args.scope || '';
  const componentName = args._[2];

  add({
    currentPath,
    scope,
    componentName
  });
};

/**
 *
 * @param scope - scope name
 * @param componentName
 * @param currentPath - console path | set option path
 */
function add({scope = '', componentName = 'my-component', currentPath = process.cwd()} = {}) {
  const destPath = path.resolve(currentPath, componentName);
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath);
  }
  copyBoilerplateDirectory({
    destPath,
    copyPath: pathBoilerplateTs,
    componentName,
    scope
  });
}

/**
 * Copy files from directory and change options
 * @param scope
 * @param componentName
 * @param destPath
 * @param copyPath
 */
function copyBoilerplateDirectory({scope, componentName, destPath, copyPath}) {
  fs.readdirSync(copyPath).forEach(fileName => {
    if (isDirectory(path.resolve(copyPath, fileName))) {
      fs.mkdirSync(path.resolve(destPath, fileName));
      copyBoilerplateDirectory({
        scope,
        componentName,
        destPath: path.resolve(destPath, fileName),
        copyPath: path.resolve(copyPath, fileName)
      })
    } else if (isFile(path.resolve(copyPath, fileName))) {
      handleFile({copyPath, destPath, fileName, scope, componentName});
    }
  })
}

/**
 * Handle file from boilerplate: Copying file to destination directory and editing them if needed
 * @param destPath
 * @param copyPath
 * @param fileName
 * @param scope
 * @param componentName
 */
function handleFile({destPath, copyPath, fileName, scope, componentName}) {
  const options = {path: path.resolve(destPath, fileName), scope, componentName};
  fs.copyFileSync(path.resolve(copyPath, fileName), path.resolve(destPath, fileName));
  switch (fileName.toLowerCase()) {
    case 'readme.md':
      handleReadme(options);
      break;
    case 'package.json':
      handlePackageFile(options);
      break;
    case 'some.test.tsx':
      renameFile({destPath, currentName: fileName, finalName: `${componentName}.test.tsx`});
      break;
    case 'some.test.js':
      renameFile({destPath, currentName: fileName, finalName: `${componentName}.test.js`});
      break;
    default:
  }
}

/**
 * Update params at the package.json
 * @param path - path to package.json at the dest directory
 * @param scope - scope name of package
 * @param componentName - component name
 */
function handlePackageFile({path, scope, componentName}) {
  const packageJson = require(path);
  packageJson.name = `${scope}/${componentName}`;
  fs.writeFileSync(path, packageJson);
}

/**
 * Update component name at the readme.md
 * @param path - path to package.json at the dest directory
 * @param scope - scope name of package
 * @param componentName - component name
 */
function handleReadme({path, scope, componentName}) {
  const readme = fs.readFileSync(path, 'utf-8');
  fs.writeFileSync(
    path,
    readme
      .replace(
        /\[COMPONENT_NAME]/g,
        `${scope}${scope ? '/' : ''}${componentName}`
      )
      .replace(/\[COMPONENT_DESCRIPTION]/g, '')
  );
}


