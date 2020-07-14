
const chalk = require('chalk');

const printLinks = (arrayObjLinks) => {
  let objThreeProperty = '';
  if (arrayObjLinks.length > 0) {
    arrayObjLinks.forEach((element) => {
      objThreeProperty += `
        ${chalk.grey('PATH:')} ${element.file}
        ${chalk.grey('LINK:')} ${element.href}
        ${chalk.grey('TEXT:')} ${element.text.substring(0, 50)}
        `;
    });
  }
  if (arrayObjLinks.length === 0) {
    return 'No se encontraron links en esa ruta';
  }
  return objThreeProperty;
};

const printValidate = (arrayObjLinks) => {
  let objFiveProperty = '';
  if (arrayObjLinks.length === 0) {
    objFiveProperty = 'No se encontraron links en esa ruta';
  }
  if (arrayObjLinks.length > 0) {
    arrayObjLinks.forEach((element) => {
      const colors = element.statusMessage === 'ok' ? chalk.bold.green(element.statusMessage) : chalk.bold.red(element.statusMessage);
      objFiveProperty += `
          ${chalk.grey('PATH:')} ${element.file}
          ${chalk.grey('LINK:')} ${element.href}
          ${chalk.grey('TEXT:')} ${element.text.substring(0, 50)}
          ${chalk.cyan('STATUS_MESSAGE:')} ${colors}
          ${chalk.cyan('STATUS:')} ${element.status}
        `;
    });
  }
  return objFiveProperty;
};

const printStats = (arrayObjLinks) => {
  const totalLinks = arrayObjLinks.length;
  const allLinks = arrayObjLinks.map((element) => element.href);
  const setUniqueLinks = new Set(allLinks);
  const stats = `
        ${chalk.rgb(252, 91, 96)('Total:')} ${totalLinks}
        ${chalk.rgb(252, 91, 96)('Unique:')} ${setUniqueLinks.size}
    `;
  return stats;
};

const printStatsandValidate = (arrayObjLinks) => {
  const brokenLinks = arrayObjLinks.filter((elem) => elem.status === 404);
  const stats = `
        ${printStats(arrayObjLinks)}
        ${chalk.rgb(252, 91, 96).inverse('Broken:')} ${brokenLinks.length}`;
  return stats;
};

module.exports = {
  printStats,
  printLinks,
  printValidate,
  printStatsandValidate,
};
