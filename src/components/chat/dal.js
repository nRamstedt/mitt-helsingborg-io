const axios = require('axios');
const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const status = error.status || error.response.status;
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter) => {
  const convertData = await jsonapi.convert[converter](data);
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, convertData);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const postWatsonMsg = async (req, res) => {
  try {
    const endpoint = `${process.env.WATSONURL}/api/v1/message`;

    const resourceData = await axios.post(endpoint, req.body);

    return await createSuccessResponse(resourceData.data.data, res, 'message', 'apiObject');
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

    const resourceData = await axios.get(endpoint);

    return await createSuccessResponse(resourceData.data.data, res, 'workspaces', 'apiObject');
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
