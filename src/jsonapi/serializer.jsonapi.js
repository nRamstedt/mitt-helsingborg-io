const JSONAPISerializer = require('json-api-serializer');
const schemas = require('./schemas');


const Serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  unconvertCase: 'camelCase',
});

Serializer.register('bankidauth', schemas.bankidAuth);

module.exports = Serializer;
