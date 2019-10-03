const router = require('express').Router();
const dal = require('./dal');

router.get('/', async (req, res) => dal.read.forms(req, res));
router.get('/:formId', async (req, res) => dal.read.form(req, res));
router.get('/:formId/questions', async (req, res) => dal.read.questions(req, res));

module.exports = router;
