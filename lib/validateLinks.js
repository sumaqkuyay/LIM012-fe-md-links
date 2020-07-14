const fetch = require('node-fetch');
const mainFunctions = require('./mainFunctions');

const isValidate = (route) => {
  const allLinks = mainFunctions.extractLinks(route);
  const addTwoProperty = [];
  let message;
  allLinks.forEach((element) => {
    addTwoProperty.push(
      fetch(element.href)
        .then((reply) => {
          if (reply.status >= 200 && reply.status < 400) {
            message = 'ok';
          }
          if (reply.status >= 404) message = 'fail';
          const object = {
            href: element.href,
            text: element.text,
            file: element.file,
            status: reply.status,
            statusMessage: message,
          };
          return object;
        }),
    );
  });
  return Promise.all(addTwoProperty);
};

module.exports = isValidate;
