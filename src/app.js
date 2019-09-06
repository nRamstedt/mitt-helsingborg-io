
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
const swaggerDocument = require('../swagger/swagger.json');
const routes = require('./components/routes');
const logger = require('./utils/logger');

require('body-parser-xml')(bodyParser);

const app = express();

/**
 * Config
 */
const SERVER_PORT = process.env.PORT || config.get('SERVER.PORT');

// Allow cors for dev-environment.
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.xml({ normalize: true }));

// Request logging
app.use(pino({ logger }));

// Add routes to the app.
app.get('/', (req, res) => res.send('Mitt Helsingborg API - Main touchpoint for mitt helsingborg app, webpage and assistants.'));
app.use(routes);

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const server = https.createServer(httpsOptions, app).listen(SERVER_PORT,
// () => console.log(`Mitt Helsingborg touchpoint app listening on port ${SERVER_PORT}!`));
const server = http.createServer(app).listen(SERVER_PORT, () => console.log(`Mitt Helsingborg touchpoint app listening on port ${SERVER_PORT}!`));

module.exports = server;
