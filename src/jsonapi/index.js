const Serializer = require('./serializer.jsonapi');
const returnJsonApiObject = require('./convert/apiObject.jsonapi');

/**
 * Export
 * serializer: instance of json-api-serializer
 * convert: helper functions to convert data to serializable objects.
 */

module.exports = {
  serializer: Serializer,
  convert: {
    apiObject: returnJsonApiObject,
  },
};
