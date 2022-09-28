import { program } from 'commander';
import clc from 'cli-color';
import createService from './createService';

program
  .name('tgql')
  .description('gql type generator')
  .version('0.1.0', '-v, --version')
  .usage('<command> [options]');

program.option('-p, --path <path>', 'listening for file path');
program.option(
  '-k, --key <path>',
  'listening for fileName key, default: Schema',
);
program.option('-s, --server <path>', 'gql server');

const options = program.opts();

program.parse();

if (options.path || options.server) {
  createService(options.path, options.server, options.key);
  console.info(clc.greenBright('service is start'));
} else {
  console.error(clc.red('Error: -p -s, file path and server is required'));
}

// createService('./src/test', 'http://map-service:28080/graphql');
// console.info(clc.greenBright('service is start'));
