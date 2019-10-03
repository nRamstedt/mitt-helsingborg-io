const axios = require('axios');
const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const status = error.status || error.response.status;
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter = undefined) => {
  let dataToSerialize = data;
  if (converter) {
    dataToSerialize = await jsonapi.convert[converter](dataToSerialize);
  }

  const serializedData = await jsonapi.serializer.serialize(jsonapiType, dataToSerialize);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const postWatsonMsg = async (req, res) => {
  try {
    const endpoint = `${process.env.WATSONURL}/api/v1/message`;

    const jsonapiResponse = await axios.post(endpoint, req.body);
    const deserializedJsonapiResponse = jsonapi.serializer.deserialize('message', jsonapiResponse.data);

    return await createSuccessResponse(deserializedJsonapiResponse, res, 'message');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const create = {
  message: postWatsonMsg,
};

/**
 * READ RESOURCE METHODS
 */

const getWatsonWorkspace = async (req, res) => {
  try {
    const endpoint = `${process.env.WATSONURL}/api/v1/workspaces`;

    const jsonapiResponse = await axios.get(endpoint);
    const deserializedJsonapiResponse = jsonapi.serializer.deserialize('message', jsonapiResponse.data);

    return await createSuccessResponse(deserializedJsonapiResponse, res, 'workspaces');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const read = {
  workspaces: getWatsonWorkspace,
};

module.exports = {
  create,
  read,
};
