const express = require('express');

const authentication = require('./auth/api');
const user = require('./user/api');
const form = require('./form/api');
const notification = require('./notification/api');
const payment = require('./payment/api');
const chatbot = require('./chatbot/api');

const router = express.Router();

// Register route to api-layer.
router.use('/auth', authentication);
router.use('/user', user);
router.use('/form', form);
router.use('/notification', notification);
router.use('/payment', payment);
router.use('/chatbot', chatbot);

module.exports = router;
