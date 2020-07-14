const chalk = require('chalk');
const mdLinks = require('./mdLinks');
const optionsStats = require('./stats');

const help = `
${chalk.cyan('Correct Use:')}

${chalk.cyan('Option1:')} md-links <path-to-file>                                               returns markdown files on the specified path
${chalk.cyan('Option2:')} md-links <path-to-file> --validate                                    returns more characteristics of markdown files
${chalk.cyan('Option3:')} md-links <path-to-file> --stats                                       returns basic statistics of markdown files
${chalk.cyan('Option4:')} md-links <path-to-file> --stats --validate || --validate --stats      returns more statistics of markdown files

`;

const optionsCLI = (path, options) => {
  if (options.length > 0) {
    if (options === '--validate') {
      return mdLinks(path, { validate: true })
        .then((links) => optionsStats.printValidate(links));
    }

    if (options === '--stats') {
      return mdLinks(path, { validate: true })
        .then((links) => optionsStats.printStats(links));
    }

    if (options === '--stats --validate' || options === '--validate --stats') {
      return mdLinks(path, { validate: true })
        .then((links) => optionsStats.printStatsandValidate(links));
    }
    return Promise.resolve(help);
  }
  return mdLinks(path, { validate: false })
    .then((links) => optionsStats.printLinks(links));
};

module.exports = optionsCLI;
