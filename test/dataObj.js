const path = require('path');
const chalk = require('chalk');

const arrayOutput = ['archivo1.txt', 'archivo2.js', 'archivo3.html', 'archivo4.md', 'carpeta1'];

const arrayOutputFilemd = [path.join(process.cwd(), 'test', 'test_container', 'archivo4.md'),
  path.join(process.cwd(), 'test', 'test_container', 'carpeta1', 'archivo5.md'),
  path.join(process.cwd(), 'test', 'test_container', 'carpeta1', 'carpeta2', 'archivo7.md')];

const outputLinks = [
  {
    file: path.join(process.cwd(), 'test', 'test_container', 'archivo4.md'),
    href: 'https://nodejs.org/',
    text: 'Node.js',
  }, {
    file: path.join(process.cwd(), 'test', 'test_container', 'archivo4.md'),
    href: 'https://nodejs.org/pe',
    text: 'Node.js',
  }];

const linksOutput = [
  {
    file: path.join(process.cwd(), 'test', 'test_container', 'archivo4.md'),
    href: 'https://nodejs.org/',
    text: 'Node.js',
    status: 200,
    statusMessage: 'ok',
  }, {
    file: path.join(process.cwd(), 'test', 'test_container', 'archivo4.md'),
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
        ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'archivo4.md')}
        ${chalk.grey('LINK:')} https://nodejs.org/
        ${chalk.grey('TEXT:')} Node.js
        
        ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'archivo4.md')}
        ${chalk.grey('LINK:')} https://nodejs.org/pe
        ${chalk.grey('TEXT:')} Node.js
        `;

const printValidateOutput = `
          ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'archivo4.md')}
          ${chalk.grey('LINK:')} https://nodejs.org/
          ${chalk.grey('TEXT:')} Node.js
          ${chalk.cyan('STATUS_MESSAGE:')} ${chalk.bold.green('ok')}
          ${chalk.cyan('STATUS:')} 200
        
          ${chalk.grey('PATH:')} ${path.join(process.cwd(), 'test', 'test_container', 'archivo4.md')}
          ${chalk.grey('LINK:')} https://nodejs.org/pe
          ${chalk.grey('TEXT:')} Node.js
          ${chalk.cyan('STATUS_MESSAGE:')} ${chalk.bold.red('fail')}
          ${chalk.cyan('STATUS:')} 404
        `;

const help = `
----------------------------Valid Arguments----------------------------

${chalk.yellow.inverse('Option1:')} md-links <path-to-file>
${chalk.yellow.inverse('Option2:')} md-links <path-to-file> --validate
${chalk.yellow.inverse('Option3:')} md-links <path-to-file> --stats
${chalk.yellow.inverse('Option4:')} md-links <path-to-file> (--stas --validate || --validate --stas)

------------------------------------------------------------------------
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
