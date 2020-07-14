const mainFunctions = require('./mainFunctions.js');
const validateLinks = require('./validateLinks.js');

const mdLinks = (path, options) => {
  const allLinks = new Promise((resolve) => {
    resolve(mainFunctions.extractLinks(path));
  });
  if (options.validate === true) {
    return validateLinks(path);
  }
  return allLinks;
};

module.exports = mdLinks;
