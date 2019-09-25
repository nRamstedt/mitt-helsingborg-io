const axios = require('axios');
const logger = require('../../utils/logger');

exports.getAllForms = async () => {
  const endpoint = `${process.env.FORM_SERVICE_URL}/forms/`;

  return axios.get(endpoint).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);

      return null;
    }

    logger.debug(response.data);

    return response.data;
  });
};

exports.getFormTemplate = async (formId) => {
  const endpoint = `${process.env.FORM_SERVICE_URL}/forms/${formId}`;

  return axios.get(endpoint).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);

      return null;
    }

    logger.debug(response.data);

    return response.data;
  });
};

exports.getFormQuestions = async (formId) => {
  const endpoint = `${process.env.FORM_SERVICE_URL}/forms/${formId}/questions`;
  logger.debug('form dal');

  return axios.get(endpoint).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);

      return null;
    }

    logger.debug(response.data);

    return response.data;
  });
};
