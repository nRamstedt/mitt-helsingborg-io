const axios = require('axios');
const https = require('https');
const config = require('config');

exports.authenticate = async (personalNumber, endUserIp) => {
  // TODO Save in config file
  const endpoint = `${config.get('SERVER.BANKIDURL')}/auth/`;

  const data = {
    personalNumber,
    endUserIp,
    userVisibleData: 'Helsingborg stad',
  };

  return axiosClient.post(endpoint, data).then((response) => {
    if (response.status !== 200) {
      console.log(response.status);
      console.log(response.data);
      return null;
    }
    return response.data;
  });
};

exports.collect = async (orderRef) => {
  // TODO Save in config file
  const endpoint = `${config.get('SERVER.BANKIDURL')}/collect/`;
  const data = {
    orderRef,
  };
  return axiosClient.post(endpoint, data).then((response) => {
    if (response.status !== 200) {
      console.log(response.status);
      console.log(response.data);
      return null;
    }
    return response.data;
  });
};
// Function to bypass the whole bankid and navet step for dev purposes.
const bypassAuthUser = async (pno, endUserIp) => ({
  user: {
    name: 'Tom Andreasson',
    givenName: 'Tom',
    surname: 'Andreasson',
    personalNumber: pno,
    navet: {
      address: 'Drottninggatan 2',
      zipCode: 11120,
      city: 'Stockholm',
    },
  },
});

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
