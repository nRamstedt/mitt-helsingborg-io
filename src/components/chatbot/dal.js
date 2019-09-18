const axios = require('axios');
const logger = require('../../utils/logger');

exports.postWatsonMsg = async (msg) => {
  try {
    const endpoint = 'http://localhost:3037/api/v1/workspaces';

    const data = {
      msg,
    };

    return axios.post(endpoint, data).then((response) => {
      if (response.status !== 200) {
        logger.info(response.status);
        logger.info(response.data);

        return null;
      }

      return response.data;
    });
  } catch (err) {
    logger.debug(err.msg);

    return null;
  }
};

exports.getWatsonWorkspace = async () => {
  const endpoint = 'http://localhost:3037/api/v1/workspaces';

  try {
    return axios.get(endpoint).then((response) => {
      if (response.status !== 200) {
        logger.log(response.status);
        logger.log(response.data);

        return null;
      }

      return response.data;
    });
  } catch (error) {
    logger.error(error);

    return null;
  }
};
