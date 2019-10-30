const router = require('express').Router();
const dal = require('./dal');

router.post('/message', async (req, res) => dal.create.message(req, res));
router.get('/workspaces', async (req, res) => dal.read.workspaces(req, res));

module.exports = router;
