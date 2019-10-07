const router = require('express').Router();
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => dal.bankid.auth(req, res));
router.post('/collect', validateRequest, async (req, res) => dal.bankid.collect(req, res));
router.post('/sign', async (req, res) => dal.bankid.sign(req, res));
router.delete('/cancel', async (req, res) => dal.bankid.cancel(req, res));

module.exports = router;
