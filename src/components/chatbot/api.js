const router = require('express').Router();
const dal = require('./dal');

router.post('/message', async (req, res) => {
  try {
    const resMsg = await dal.postWatsonMsg(req.body);

    return res.json(resMsg);
  } catch (err) {
    return res.json(err.msg);
  }
});

router.get('/workspace', async (req, res) => {
  const reqWorkspace = await dal.getWatsonWorkspace();

  return res.json(reqWorkspace);
});

module.exports = router;
