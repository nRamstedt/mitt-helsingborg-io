const JSONAPISerializer = require('json-api-serializer');
const schemas = require('./schemas');

const Serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  unconvertCase: 'camelCase',
});

Serializer.register('bankidAuth', schemas.bankidAuth);

module.exports = Serializer;
