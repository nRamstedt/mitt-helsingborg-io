
const express = require('express');
const https = require('https');
const http = require('http');
const config = require('config');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const jwt = require('express-jwt');
const cors = require('cors');
const pino = require('express-pino-logger');
const sslRedirect = require('heroku-ssl-redirect');
const swaggerDocument = require('../swagger/swagger.json');
const routes = require('./components/routes');
const logger = require('./utils/logger');

require('body-parser-xml')(bodyParser);

const app = express();

/**
 * Config
 */
const { PORT, CERT, KEY, AUTHSECRET} = process.env;
// const httpsOptions = {
//   cert: fs.readFileSync(CERT),
//   key: fs.readFileSync(KEY),
//   requestCert: false,
//   rejectUnauthorized: false,
// };

// enable ssl redirect in heroku enviroments
app.use(sslRedirect());

// Allow cors for dev-environment.
app.use(cors());
app.options('*', cors());

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

// Require authorization on all endpoints except those specified under unless.
app.use(
  jwt({ secret: AUTHSECRET })
    .unless({ path: ['/auth/', '/auth', '/'] }),
);

// If request is unauthorized, send back error information with 401 status.
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Your authorization token is missing or invalid.');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({ normalize: true }));

// Request logging
app.use(pino({ logger }));

// Add routes to the app.
app.use(routes());

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Listen on port specfied in env-file.
const server = app.listen(PORT,
  () => logger.info(`Mitt Helsingborg touchpoint listening on port ${PORT}!`));

module.exports = server;
