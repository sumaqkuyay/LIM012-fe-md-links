const path = require('path');
const chalk = require('chalk');

const arrayOutput = ['file1.txt', 'file2.js', 'file3.html', 'file4.md', 'folder1'];

const arrayOutputFilemd = [path.join(process.cwd(), 'test', 'test_container', 'file4.md'),
  path.join(process.cwd(), 'test', 'test_container', 'folder1', 'file5.md'),
  path.join(process.cwd(), 'test', 'test_container', 'folder1', 'folder2', 'archivo7.md')];

const outputLinks = [
  {
    file: path.join(process.cwd(), 'test', 'test_container', 'file4.md'),
    href: 'https://nodejs.org/',
    text: 'Node.js',
  }, {
    file: path.join(process.cwd(), 'test', 'test_container', 'file4.md'),
    href: 'https://nodejs.org/pe',
    text: 'Node.js',
  }];

const linksOutput = [
  {
    file: path.join(process.cwd(), 'test', 'test_container', 'file4.md'),
    href: 'https://nodejs.org/',
    text: 'Node.js',
    status: 200,
    statusMessage: 'ok',
  }, {
    file: path.join(process.cwd(), 'test', 'test_container', 'file4.md'),
    href: 'https://nodejs.org/pe',
    text: 'Node.js',
    status: 404,
    statusMessage: 'fail',
  }];

const printStatsOutput = `
        ${chalk.rgb(252, 91, 96)('Total:')} 2
        ${chalk.rgb(252, 91, 96)('Unique:')} 2
    `;

const printLinksOutput = `
        ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'file4.md')}
        ${chalk.grey('LINK:')} https://nodejs.org/
        ${chalk.grey('TEXT:')} Node.js
        
        ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'file4.md')}
        ${chalk.grey('LINK:')} https://nodejs.org/pe
        ${chalk.grey('TEXT:')} Node.js
        `;

const printValidateOutput = `
          ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'file4.md')}
          ${chalk.grey('LINK:')} https://nodejs.org/
          ${chalk.grey('TEXT:')} Node.js
          ${chalk.cyan('STATUS_MESSAGE:')} ${chalk.bold.green('ok')}
          ${chalk.cyan('STATUS:')} 200
        
          ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'file4.md')}
          ${chalk.grey('LINK:')} https://nodejs.org/pe
          ${chalk.grey('TEXT:')} Node.js
          ${chalk.cyan('STATUS_MESSAGE:')} ${chalk.bold.red('fail')}
          ${chalk.cyan('STATUS:')} 404
        `;

const help = `
${chalk.cyan('Correct Use:')}

${chalk.cyan('Option1:')} md-links <path-to-file>                                               returns markdown files on the specified path
${chalk.cyan('Option2:')} md-links <path-to-file> --validate                                    returns more characteristics of markdown files
${chalk.cyan('Option3:')} md-links <path-to-file> --stats                                       returns basic statistics of markdown files
${chalk.cyan('Option4:')} md-links <path-to-file> --stats --validate || --validate --stats      returns more statistics of markdown files

`;


module.exports = {
  arrayOutput,
  arrayOutputFilemd,
  outputLinks,
  linksOutput,
  printStatsOutput,
  printLinksOutput,
  printValidateOutput,
  help,
};
