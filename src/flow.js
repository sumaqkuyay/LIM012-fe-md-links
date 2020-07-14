/* eslint-disable max-len */
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
// Determinar si la ruta es absoluta
const pathIsAbsolute = (namePath) => path.isAbsolute(namePath);

const convertToAbsolute = (namePath) => (pathIsAbsolute(namePath) ? namePath : path.resolve(namePath));

const isFile = (namePath) => fs.statSync(namePath).isFile();

const isDirectory = (namePath) => fs.statSync(namePath).isDirectory();

const checkDirectory = (namePath) => {
  let arrayFile = [];
  if (isFile(namePath)) {
    arrayFile.push(namePath);
  } else if (isDirectory(namePath)) {
    const readDirectory = fs.readdirSync(namePath);
    readDirectory.forEach((obj) => {
      const element = path.join(namePath, obj);
      const result = (isDirectory(element)) ? checkDirectory(element) : element;
      arrayFile = arrayFile.concat(result);
    });
  } else {
    console.log('Path is not a valid file nor a valid directory');
  }
  return arrayFile;
};

// ¿Es un archivo .md?
const isMd = (namePath) => (path.extname(namePath) === '.md');

// Filtra archivos .md almacenandolos en un array
const filterIsMd = (arryFile) => {
  const arrayIsMd = [];
  arryFile.forEach((element) => {
    console.log(element);
    if (path.extname(element) === '.md') {
      arrayIsMd.push(element);
    }
  });
  return arrayIsMd;
};

// Retornará un array de objetos con tres propiedades
const findUrl = (mdfile) => {
  const data = fs.readFileSync(mdfile, 'utf8');
  const toString = data.toString();
  const regExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;
  const regExprText = /(?:[^[])([^[]*)(?=(\]+\(((https?:\/\/)|(http?:\/\/)|(www\.))))/g;
  const links = toString.match(regExp);
  const text = toString.match(regExprText);
  const urls = [];
  if (links) {
    for (let i = 0; i < links.length; i += 1) {
      const linkElement = {
        file: mdfile,
        href: links[i],
        text: text[i],
      };
      urls.push(linkElement);
    }
  }
  return urls;
};

// Validación de links
const validateLinks = (mdfile) => {
  const allLinks = findUrl(mdfile);
  const arrayPromise = allLinks.map((e) => new Promise((resolve) => fetch(e.href)
    .then((response) => {
      e.status = response.status;
      if (response.status >= 200 && response.status < 400) {
        e.statustext = 'ok';
      }
      if (response.status >= 404) {
        e.statustext = 'fail';
      }
      resolve(e);
    })
    // .catch((error) => {
    //   e.status = 404;
    //   console.log(error);
    //   e.statustext = 'fail';
    //   resolve(e);
    .catch(() => {
      e.status = 404;
      e.statustext = 'fail';
      resolve(e);
    })));
  return Promise.all(arrayPromise);
};

module.exports = {
  pathIsAbsolute,
  convertToAbsolute,
  isFile,
  isDirectory,
  checkDirectory,
  isMd,
  filterIsMd,
  findUrl,
  validateLinks,
};
