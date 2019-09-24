const router = require('express').Router();
const dal = require('./dal');
const logger = require('../../utils/logger');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');

const validateRequest = schemaValidator(true, authSchemas);

router.post('/', validateRequest, async (req, res) => {
  try {
    const { inputData } = req.body;

    // Map inputdata to existing keys in the db.
    const name = inputData.find(x => x.key === 'name').value;
    const personalNumber = inputData.find(x => x.key === 'personalNumber').value;
    const address = inputData.find(x => x.key === 'address').value;
    const zipCode = inputData.find(x => x.key === 'zipCode').value;
    const city = inputData.find(x => x.key === 'city').value;

    const formRow = {
      Name: name,
      PersonalNumber: personalNumber,
      Address: address,
      ZipCode: zipCode,
      City: city,
      Status: 0,
    };

    return res.json(
      await dal.saveForm(formRow),
    );
  } catch (err) {
    res.json(err);
  }
});

router.get('/forms', async (req, res) => {
  try {
    const reqForms = await dal.getAllForms();

    return res.json(reqForms);
  } catch (error) {
    const errorMsg = error.message;
    logger.error(errorMsg);

    return res.json(errorMsg);
  }
});

router.get('/getFormTemplate/:formId', async (req, res) => {
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

module.exports = router;
