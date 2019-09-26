const menus = {
  main: `
    uikit-cli [command] <options>

    \x1b[1mOptions:\x1b[0m
    init \t\t Create a new project into directory
    component \t\t Create component from template into directory
    version, -v \t\t Show package version
    help, -h \t\t Show help menu for a command`,

  component: `
    uikit-cli component [command] [component_name] <options>

    \x1b[1mCommands:\x1b[0m
    add \t\t Add component
    remove \t\t Remove component from directory
    
    \x1b[1mOptions:\x1b[0m
    --path, -p \t\t\t Base file directory path
    --scope, -s \t\t Scope at component`,

  init: `
    uikit-cli init [project_name] <options>
    
    \x1b[1mOptions:\x1b[0m
    --path, -p \t\t Base file directory path`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main)
};
