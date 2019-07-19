const jwt = require('jsonwebtoken');
const router = require('express').Router();
const config = require('config');
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => {
  try {
    const { personalNumber, endUserIp } = req.body;

    const user = await dal.authenticate(personalNumber, endUserIp);

    if (user && user.status === 200) {
      const token = jwt.sign({ pno: user.personalNumber }, config.get('SERVER.AUTHSECRET'), { expiresIn: '24h' }); // Signing the token
      res.json({
        sucess: true,
        err: null,
        token,
        user: { ...user.data },
      });
    } else {
      console.log('auth failed');
      res.status(401).json({
        sucess: false,
        token: null,
        err: 'auth failed',
        user: null,
      });
    }
  } catch (err) {
    return err;
  }
});

router.post('/:orderRef', validateRequest, async (req, res) => {
  try {
    const { orderRef } = req.params;

    const user = await dal.collect(orderRef);

    return res.json(user);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
