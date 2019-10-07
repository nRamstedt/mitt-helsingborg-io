const axios = require('axios');
const https = require('https');
const logger = require('../../utils/logger');
const jsonapi = require('../../jsonapi');
const { throwCustomDomainError } = require('../../utils/error');

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

const tryAxiosRequest = async (callback) => {
  try {
    const response = await callback();
    return response;
  } catch (error) {
    throwCustomDomainError(error.response.status);
    return undefined;
  }
};

const readForms = async (req, res) => {
  try {
    const endpoint = `${process.env.FORM_SERVICE_URL}/forms/`;
    const axiosResponse = await tryAxiosRequest(() => axiosClient.get(endpoint));

    return res.json(axiosResponse.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const readForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const endpoint = `${process.env.FORM_SERVICE_URL}/forms/${formId}`;
    const axiosResponse = await tryAxiosRequest(() => axiosClient.get(endpoint));

    return res.json(axiosResponse.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const readFormQuestions = async (req, res) => {
  try {
    const { formId } = req.params;
    const endpoint = `${process.env.FORM_SERVICE_URL}/forms/${formId}`;
    const axiosResponse = await tryAxiosRequest(() => axiosClient.get(endpoint));

    return res.json(axiosResponse.data);
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const read = {
  forms: readForms,
  form: readForm,
  questions: readFormQuestions,
};

module.exports = {
  read,
};
