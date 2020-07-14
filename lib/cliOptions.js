const chalk = require('chalk');
const mdLinks = require('./mdLinks');
const optionsStats = require('./stats');

const help = `
----------------------------Valid Arguments----------------------------

${chalk.yellow.inverse('Option1:')} md-links <path-to-file>
${chalk.yellow.inverse('Option2:')} md-links <path-to-file> --validate
${chalk.yellow.inverse('Option3:')} md-links <path-to-file> --stats
${chalk.yellow.inverse('Option4:')} md-links <path-to-file> (--stas --validate || --validate --stas)

------------------------------------------------------------------------
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
