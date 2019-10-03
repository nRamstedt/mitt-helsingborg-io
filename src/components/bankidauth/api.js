const router = require('express').Router();
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => dal.authenticateBankid(req, res));
router.post('/collect', validateRequest, async (req, res) => dal.collect(req, res));
router.post('/cancel', validateRequest, async (req, res) => dal.cancel(req, res));
router.post('/sign', async (req, res) => dal.sign(req, res));

module.exports = router;
