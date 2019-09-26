const minimist = require('minimist');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'help':
      require('./help')(args);
      break;
    case 'version':
      require('./version')(args);
      break;
    case 'component':
      require('./component')(args);
      break;
    case 'init':
      // require('./init')(args);
      console.info('\x1b[36mcoming soon...\x1b[0m');
      break;
    default:
      console.error(`\x1b[1m\x1b[31m"${cmd}" is not a valid command!\x1b[0m`);
      break;
  }
};
