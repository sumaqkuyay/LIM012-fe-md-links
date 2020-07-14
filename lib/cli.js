#!/usr/bin/env node
const chalk = require('chalk');
const cliOpt = require('./options');

// capturo argumentos de la línea de comandos
const [,, ...args] = process.argv;
const pathCLI = args[0];
const input = [];
for (let i = 1; i < args.length; i += 1) {
  input.push(args[i]);
}
const newInput = input.join(' ');

// eslint-disable-next-line no-console
const { log } = console;
const help = `
----------------------------Valid Arguments----------------------------

${chalk.yellow.inverse('Option1:')} md-links <path-to-file>
${chalk.yellow.inverse('Option2:')} md-links <path-to-file> --validate
${chalk.yellow.inverse('Option3:')} md-links <path-to-file> --stats
${chalk.yellow.inverse('Option4:')} md-links <path-to-file> (--stats --validate || --validate --stats)

------------------------------------------------------------------------
`;

if (pathCLI === undefined) {
  log(help);
} else {
  cliOpt(pathCLI, newInput)
    .then((response) => log(response))
    .catch((error) => log(chalk.rgb(255, 56, 20).inverse('ERROR'), '-- No se encontró esta ruta --'));
}


// console.log(`Hello world ${imprime} ${imprime1}`);
// console.log(`Hola ${pathCLI}`);
// console.log(`Hola ${args}`);
