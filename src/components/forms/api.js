const router = require('express').Router();
const dal = require('./dal');
const logger = require('../../utils/logger');

router.get('/', async (req, res) => {
  try {
    const reqForms = await dal.getAllForms();

    return res.json(reqForms);
  } catch (error) {
    const errorMsg = error.message;
    logger.error(errorMsg);

    return res.json(errorMsg);
  }
});

router.get('/:formId', async (req, res) => {
  const { formId } = req.params;

  try {
    const reqForm = await dal.getFormTemplate(formId);

    return res.json(reqForm);
  } catch (error) {
    const errorMsg = error.message;
    logger.error(errorMsg);

    return res.json(errorMsg);
  }
});

router.get('/:formId/questions', async (req, res) => {
  const { formId } = req.params;
  logger.debug('form api');

  try {
    const reqForm = await dal.getFormQuestions(formId);

    return res.json(reqForm);
  } catch (error) {
    const errorMsg = error.message;
    logger.error(errorMsg);

    return res.json(errorMsg);
  }
});

module.exports = router;
