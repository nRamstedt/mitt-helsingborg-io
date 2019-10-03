const router = require('express').Router();
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.get('/:id', validateRequest, async (req, res) => dal.read.user(req, res));

module.exports = router;
