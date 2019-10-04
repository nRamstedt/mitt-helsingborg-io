const axios = require('axios');
const https = require('https');
const config = require('config');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const { throwCustomDomainError } = require('../../utils/error');
const jsonapi = require('../../jsonapi');

const axiosClient = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    cert: process.env.CERT,
    key: process.env.KEY,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
});

const createErrorResponse = async (error, res) => {
  logger.info(error.status);
  logger.info(error.data);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter = undefined) => {
  let dataToSerialize = data;
  if (converter) {
    dataToSerialize = await jsonapi.convert[converter](dataToSerialize);
  }

  const serializedData = await jsonapi.serializer.serialize(jsonapiType, dataToSerialize);
  return res.json(serializedData);
};


const tryAxiosRequest = async (callback) => {
  try {
    const response = await callback();
    return response;
  } catch (error) {
    throwCustomDomainError(error.response.status);
    return undefined;
  }
};


const auth = async (req, res) => {
  try {
    const { personalNumber, endUserIp } = req.body;
    const endpoint = `${config.get('SERVER.BANKIDURL')}/auth`;
    const token = jwt.sign({ pno: personalNumber }, config.get('SERVER.AUTHSECRET'), { expiresIn: '24h' });

    const data = {
      personalNumber,
      endUserIp,
      userVisibleData: 'Helsingborg stad',
    };

    const jsonapiResponse = await tryAxiosRequest(() => axiosClient.post(endpoint, data));

    const deserializedJsonapiResponse = jsonapi.serializer.deserialize('bankidauth', jsonapiResponse.data);
    deserializedJsonapiResponse.token = token;

    return await createSuccessResponse(deserializedJsonapiResponse, res, 'bankidauth');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const collect = async (req, res) => {
  try {
    const { orderRef } = req.body;
    const endpoint = `${config.get('SERVER.BANKIDURL')}/collect/`;

    const data = {
      orderRef,
    };

    const response = tryAxiosRequest(() => axiosClient.post(endpoint, data));

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error);
  }
};

const cancel = async (req, res) => {
  try {
    const { orderRef } = req.body;
    const endpoint = `${config.get('SERVER.BANKIDURL')}/cancel/`;

    const data = {
      orderRef,
    };

    const response = tryAxiosRequest(() => axiosClient.post(endpoint, data));

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const sign = async (req, res) => {
  try {
    const { personalNumber, endUserIp } = req.body;
    const endpoint = `${config.get('SERVER.BANKIDURL')}/sign/`;

    const data = {
      personalNumber,
      endUserIp,
      userVisibleData: 'Helsingborg stad',
    };
    const response = tryAxiosRequest(() => axiosClient.post(endpoint, data));

    return res.json(response.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const bankid = {
  auth,
  sign,
  cancel,
  collect,
};

module.exports = {
  bankid,
};
