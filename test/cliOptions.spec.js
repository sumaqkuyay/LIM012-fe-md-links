const path = require('path');
const cliOptions = require('../lib/cliOptions');
const data = require('./dataObj');

describe('Function cliOptions', () => {
  it('Debería imprimir 5 propiedades "PATH", "LINK", "TEXT", "STATUS", "STATUS_MESSAGE" al ingresar la opción --validate', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '--validate').then((elem) => {
      expect(elem).toBe(data.printValidateOutput);
      done();
    });
  });
});

describe('Function cliOptions', () => {
  it('Debería imprimir "total" y "unique" al ingresar la opción --stats', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '--stats').then((elem) => {
      expect(elem).toBe(data.printStatsOutput);
      done();
    });
  });
});

describe('Function cliOptions', () => {
  it('Debería imprimir "total", "unique" y "broken" al ingresar la opción --stats --validate', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '--stats --validate').then((elem) => {
      expect(elem).toMatch('');
      done();
    });
  });

  it('Debería imprimir "total", "unique" y "broken" al ingresar la opción --validate --stats', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '--validate --stats').then((elem) => {
      expect(elem).toMatch('');
      done();
    });
  });
});

describe('Function cliOptions', () => {
  it('Debería imprimir 3 propiedades "PATH", "LINK", "TEXT" al no ingresar la opción', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '').then((elem) => {
      expect(elem).toBe(data.printLinksOutput);
      done();
    });
  });
});

describe('Function cliOptions', () => {
  it('Debería imprimir un mensaje de opciones válidas al ingresar una opción no válida', (done) => {
    cliOptions(path.join(process.cwd(), 'test', 'test_container'), '--NoEsOpcionValida').then((elem) => {
      expect(elem).toBe(data.help);
      done();
    });
  });
});
