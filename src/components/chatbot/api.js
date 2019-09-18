const router = require('express').Router();
const dal = require('./dal');

router.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('consoling id: ', id);

    return res.json(
      'asdf',
    );
  } catch (err) {
    return res.json(err.msg);
  }
});

router.get('/workspace', async (req, res) => {
  const reqWorkspace = await dal.getWatsonWorkspace();

  return res.json(reqWorkspace);
});

module.exports = router;
