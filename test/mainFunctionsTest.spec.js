const path = require('path');
const section = require('../lib/mainFunctions');
const data = require('./dataObj');

describe('Function pathAbsolute()', () => {
  it('Debería retornar false si la ruta es relativa', () => {
    expect(section.pathAbsolute('.')).toBe(false);
  });

  it('Debería retornar true si la ruta es absoluta', () => {
    expect(section.pathAbsolute('/folder1/file5.md')).toBe(true);
  });
});

describe('Function getAbsolute()', () => {
  it('Debería retornar una ruta absoluta al pasarle una ruta relativa', () => {
    expect(section.getAbsolute('.')).toBe(process.cwd());
  });

  it('Debería retornar una ruta absoluta al pasarle una ruta absoluta', () => {
    expect(section.getAbsolute('/folder1/file5.md')).toBe('/folder1/file5.md');
  });
});

describe('Function isFile()', () => {
  it('Debería retornar true si es un archivo', () => {
    expect(section.isFile(path.join(process.cwd(), 'test', 'test_container', 'file1.txt'))).toBe(true);
  });

  it('Debería retornar false si es un directorio', () => {
    expect(section.isFile(path.join(process.cwd(), 'test', 'test_container'))).toBe(false);
  });
});

describe('Function fileExtension()', () => {
  it('Debería retornar la extensión del archivo al encontrar el primer punto', () => {
    expect(section.fileExtension('file4.md')).toBe('.md');
  });

  it('Debería retornar una cadena vacía al no encontrar el primer punto', () => {
    expect(section.fileExtension('folder1')).toBe('');
  });
});

describe('Function directoryNavigator()', () => {
  it('Debería retornar un array con el contenido del directorio', () => {
    expect(section.directoryNavigator(path.join(process.cwd(), 'test', 'test_container'))).toEqual(data.arrayOutput);
  });
});

describe('Function getOnlyFilesMD()', () => {
  it('Debería retornar un array con archivos .md', () => {
    expect(section.getOnlyFilesMD(path.join(process.cwd(), 'test', 'test_container'))).toEqual(data.arrayOutputFilemd);
  });

  it('Debería retornar un array vacío al no encontrar archivos .md', () => {
    expect(section.getOnlyFilesMD(path.join(process.cwd(), 'lib'))).toEqual([]);
  });
});

describe('Function readDocumentMD()', () => {
  it('Debería retornar el contenido del archivo', () => {
    expect(section.readDocumentMD(path.join(process.cwd(), 'test', 'test_container', 'file1.txt'))).toEqual('prueba');
  });
});

describe('Function extractLinks()', () => {
  it('Debería retornar un array de links encontrados en archivos .md', () => {
    expect(section.extractLinks(path.join(process.cwd(), 'test', 'test_container'))).toEqual(data.outputLinks);
  });
});
