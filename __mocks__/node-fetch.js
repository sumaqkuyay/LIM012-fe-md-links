const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, nodeFetch, {
  fetch: nodeFetch,
});

fetchMock
  .mock('https://nodejs.org/', 200)
  .mock('https://nodejs.org/pe', 404)
  .mock('https://nodejs.org/pes', () => {
    throw new Error('Error');
  });

module.exports = fetchMock;
