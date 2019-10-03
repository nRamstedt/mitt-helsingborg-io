const router = require('express').Router();
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');
const logger = require('../../utils/logger');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => {
  console.log(req.body);
  const response = dal.authenticateBankid(req, res);
  return response;
});

router.post('/collect', validateRequest, async (req, res) => {
  try {
    const { orderRef } = req.params;

    const user = await dal.collect(orderRef);

    return res.json(user);
  } catch (err) {
    return err;
  }
});

router.post('/cancel/:orderRef', validateRequest, async (req, res) => {
  try {
    const { orderRef } = req.params;

    return await dal.cancel(orderRef);
  } catch (err) {
    return err;
  }
});

router.post('/sign', async (req, res) => {
  try {
    const { personalNumber, endUserIp } = req.body;
    let result = {};
    const user = await dal.sign(personalNumber, endUserIp);

    if (user && user.status === 200) {
      result = res.json({
        sucess: true,
        err: null,
        user: { ...user.data },
      });
    } else {
      logger.info('auth failed');
      result =  res.status(401).json({
        sucess: false,
        token: null,
        err: 'auth failed',
        user: null,
      });
    }
    return result;
  } catch (err) {
    return err;
  }
});

module.exports = router;
