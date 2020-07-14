const path = require('path');
const fs = require('fs');
const marked = require('marked');

// determina si es una ruta absoluta ~ return(boleano)
const pathAbsolute = (routePath) => path.isAbsolute(routePath);

// ternario para obtener la ruta absoluta
const getAbsolute = (routePath) => (pathAbsolute(routePath) ? routePath : path.resolve(routePath));

// determina si es un archivo ~ return(boleano)
const isFile = (routePath) => fs.statSync(routePath).isFile();

// retorna la extensión del path
const fileExtension = (routePath) => path.extname(routePath);

// Leer sincronicamente el contenido de un directorio dado ~ return(una array)
const directoryNavigator = (routePath) => fs.readdirSync(routePath);

// retorna un array solo con archivos .md (con su respectiva ruta)
const getOnlyFilesMD = (routePath) => {
  let arrayFilesMD = [];
  const newRoute = getAbsolute(routePath);
  if (isFile(newRoute)) {
    if (fileExtension(newRoute) === '.md') {
      arrayFilesMD.push(newRoute);
    }
  } else {
    directoryNavigator(routePath).forEach((element) => {
      const addRoute = path.join(newRoute, element);
      const filesOfDirectory = getOnlyFilesMD(addRoute);
      arrayFilesMD = arrayFilesMD.concat(filesOfDirectory);
    });
  }
  return arrayFilesMD;
};

// retorna el contenido del path
const readDocumentMD = (document) => fs.readFileSync(document, 'utf-8');

// Función extractora de links de archivos .md, market convierte en html el documento
// retorna un array de objetos con tres propiedades por cada link
const extractLinks = (routePath) => {
  const arrayLinks = [];
  const renderer = new marked.Renderer();
  getOnlyFilesMD(routePath).forEach((file) => {
    renderer.link = (href, title, text) => {
      const objLink = {
        href,
        text,
        file,
      };
      arrayLinks.push(objLink);
    };
    marked(readDocumentMD(file), { renderer });
  });
  return arrayLinks;
};

module.exports = {
  pathAbsolute,
  getAbsolute,
  isFile,
  fileExtension,
  directoryNavigator,
  getOnlyFilesMD,
  readDocumentMD,
  extractLinks,
};
