const express = require('express');

// Require underlying service definitions (jsonapi ahndled by respective service)
const authentication = require('./auth/api');
const user = require('./user/api');
const forms = require('./forms/api');
const notification = require('./notification/api');
const payment = require('./payment/api');
const chatbot = require('./chat/api');

const routes = () => {

  const router = express.Router();

  router.get('/', async (req, res) => res.json({
    jsonapi: {
      version: '1.0',
      meta: {
        service: 'mitt-helsingborg-io',
        owner: 'Helsingborg Stad',
        description: 'Main touchpoint for mitt helsingborg app, webpage and assistants.',
      },
    },
  }));

  // Register route to api-layer.
  router.use('/auth', authentication);
  router.use('/user', user);
  router.use('/forms', forms);
  router.use('/notification', notification);
  router.use('/payment', payment);
  router.use('/chatbot', chatbot);

  return router;
};

module.exports = routes;
