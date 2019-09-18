const axios = require('axios');
const logger = require('../../utils/logger');

exports.postWatsonMsg = async (msg) => {
  try {
    const endpoint = `${process.env.WATSONURL}/api/v1/message`;

    return axios.post(endpoint, msg).then((response) => {
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
  const endpoint = `${process.env.WATSONURL}/api/v1/workspaces`;

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
