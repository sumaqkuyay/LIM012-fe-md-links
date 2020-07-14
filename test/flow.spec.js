const path = require('path');
const fetchMock = require('../__mocks__/node-fetch.js');
const flow = require('../src/flow.js');

fetchMock
  .mock('https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions', 200)
  .mock('https://carlosazaustre.com/manejando-la-asincronia-en-javascript/', 404)
  .mock('https://www.w3schools.com/tags/asdadadd', 404);

const pathAbsolute = path.resolve('./data');
const pathFile = './data/script.js';
const pathMd = path.resolve('./test_data/testLink.md');
const mdNoLinks = path.resolve('./test_data/testNoLink.md');
const arrypathFile = ['./data/script.js'];
const arryfilesDirectory = [
  'D:\\LIM012-fe-md-links\\data\\datos\\scriptDatos.js',
  'D:\\LIM012-fe-md-links\\test_data\\testLink.md',
  'D:\\LIM012-fe-md-links\\test_data\\testNoLink.md',
  'D:\\LIM012-fe-md-links\\data\\script.js',
];

const arrFile = [
  'D:\\LIM012-fe-md-links\\test_data\\testLink.md',
  'D:\\LIM012-fe-md-links\\test_data\\testNoLink.md',
  'D:\\LIM012-fe-md-links\\data\\script.js',
];
const arrFileMd = [
  'D:\\LIM012-fe-md-links\\test_data\\testLink.md',
  'D:\\LIM012-fe-md-links\\test_data\\testNoLink.md',
];
const arrContainLinks = [
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (`RegExp`)',
    file: pathMd,
  },
  {
    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    text: 'Asíncronía en js',
    file: pathMd,
  },
  {
    href: 'https://www.w3schools.com/tags/asdadadd',
    text: 'Página w3shools',
    file: pathMd,
  },
];
const arrcontentLinksOkFail = [
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions',
    text: 'expresiones regulares (`RegExp`)',
    file: pathMd,
    status: 200,
    statustext: 'ok',
  },
  {
    href: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    text: 'Asíncronía en js',
    file: pathMd,
    status: 404,
    statustext: 'fail',
  },
  {
    href: 'https://www.w3schools.com/tags/asdadadd',
    text: 'Página w3shools',
    file: pathMd,
    status: 404,
    statustext: 'fail',
  },
];

// ¿La ruta es absoluta?
describe('pathIsAbsolute', () => {
  it('deberia retornar false si la ruta no es absoluta', () => {
    expect(flow.pathIsAbsolute('./data')).toBe(false);
  });

  it('deberia retornar true si la ruta es absoluta', () => {
    expect(flow.pathIsAbsolute(pathAbsolute)).toBe(true);
  });
});

// Convertir en absoluta
describe('convertToAbsolute()', () => {
  it('deberia retornar una ruta absoluta al ingesar una ruta absoluta', () => {
    expect(flow.convertToAbsolute(pathAbsolute)).toBe(pathAbsolute);
  });

  it('debería retornar una ruta absoluta al ingresar una ruta relativa', () => {
    expect(flow.convertToAbsolute('./data')).toBe(pathAbsolute);
  });
});

// ¿Es un archivo?
describe('isfile()', () => {
  it('debería retornar true si la ruta es un archivo', () => {
    expect(flow.isFile(pathFile)).toBe(true);
  });

  it('debería retornar false si la ruta no es un archivo', () => {
    expect(flow.isFile(pathAbsolute)).toBe(false);
  });
});

// ¿Es un directorio?
describe('isDirectory()', () => {
  it('debería retornar true si la ruta es a un directorio', () => {
    expect(flow.isDirectory(pathAbsolute)).toBe(true);
  });

  it('debería retornar false si la ruta no es un directorio', () => {
    expect(flow.isDirectory(pathFile)).toBe(false);
  });
});

// Recorrer directorio almacendo los archivos en un array
describe('checkDirectory', () => {
  it('debería ser una función', () => {
    expect(typeof flow.checkDirectory).toBe('function');
  });
  it('debería devolver un array de archivos del(los) directorio(s)', () => {
    expect(flow.checkDirectory(pathAbsolute)).toEqual(arryfilesDirectory);
  });

  it('debería devolver un array al no ser un directorio', () => {
    expect(flow.checkDirectory(pathFile)).toEqual(arrypathFile);
  });
});

// ¿Es un archivo .md?
describe('isMd()', () => {
  it('debería retornar true si es un archivo .md', () => {
    expect(flow.isMd(pathMd)).toBe(true);
  });

  it('debería retornar false si no es un arhivo .md', () => {
    expect(flow.isMd(pathFile)).toBe(false);
  });
});.
describe('filterIsMd()', () => {
  it('debería almacenar en un array los archivos con extensión .md', () => {
    expect(flow.filterIsMd(arrFile)).toEqual(arrFileMd);
  });
});

describe('findUrl()', () => {
  it('debería devolver un array vacio si el archivo .md no contiene links', () => {
    expect(flow.findUrl(mdNoLinks)).toEqual([]);
  });

  it('debería obtener el array de links que contiene el archivo .md', () => {
    expect(flow.findUrl(pathMd)).toEqual(arrContainLinks);
  });
});

describe('validateLinks', () => {
  it('debería ser una función', () => {
    expect(typeof flow.validateLinks).toBe('function');
  });

  it('debería devolver un array de objetos con cinco propiedades', (done) => {
    flow.validateLinks(pathMd).then((res) => {
      expect(res).toEqual(arrcontentLinksOkFail);
      done();
    })
      .catch(() => done());
  });
});
