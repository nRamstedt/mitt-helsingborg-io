const axios = require('axios');
const mysql = require('mysql');
const logger = require('../../utils/logger');

exports.saveForm = async inputData => new Promise(((resolve, reject) => {
  try {
    const db = mysql.createConnection({
      host: process.env.DBHOST,
      port: process.env.DBPORT,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBNAME,
    });

    db.connect((err) => {
      if (err) {
        reject(err);
      }
    });

    db.query('INSERT INTO forms SET ?', inputData, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results.insertId);
    });

    db.end();
  } catch (error) {
    reject(error);
  }
}));

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
