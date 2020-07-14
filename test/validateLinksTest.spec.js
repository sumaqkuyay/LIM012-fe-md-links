const path = require('path');
const validateLinks = require('../lib/validateLinks');
const data = require('./dataObj');


describe('Function isValidate()', () => {
  it('Debería retornar un array de objetos con 5 propiedades: file, href, text, status y statusMessage', (done) => {
    validateLinks(path.join(process.cwd(), 'test', 'test_container')).then((element) => {
      expect(element).toEqual(data.linksOutput);
      done();
    });
  });
});
