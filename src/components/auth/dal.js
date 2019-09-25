const axios = require('axios');
const https = require('https');
const config = require('config');
const logger = require('../../utils/logger');

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

const { BANKIDURL } = process.env;

exports.authenticate = async (personalNumber, endUserIp) => {
  // TODO Save in config file
  const endpoint = `${BANKIDURL}/auth/`;

  const data = {
    personalNumber,
    endUserIp,
    userVisibleData: 'Helsingborg stad',
  };

  return axiosClient.post(endpoint, data).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);
      return null;
    }
    return response.data;
  });
};

exports.collect = async (orderRef) => {
  const endpoint = `${BANKIDURL}/collect/`;
  const data = {
    orderRef,
  };
  return axiosClient.post(endpoint, data).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);
      return null;
    }
    return response.data;
  });
};

exports.cancel = async (orderRef) => {
  const endpoint = `${BANKIDURL}/cancel/`;
  const data = {
    orderRef,
  };
  return axiosClient.post(endpoint, data).then((response) => {
    logger.info('ResponseStatue: ', response);
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);
      return null;
    }
    return response.data;
  });
};

exports.sign = async (personalNumber, endUserIp) => {
  const endpoint = `${BANKIDURL}/sign/`;
  const data = {
    personalNumber,
    endUserIp,
    userVisibleData: 'Helsingborg stad',
  };
  return axiosClient.post(endpoint, data).then((response) => {
    if (response.status !== 200) {
      logger.info(response.status);
      logger.info(response.data);
      return null;
    }
    return response.data;
  });
};
