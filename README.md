
# My-pages-api

This is the api for the Modularity-my-pages project. It handles all server side logic and integrations with other apis to connect with Bankid, Navet and Paynova. 

## Development

This api is built on Node.js and Express and is created with this <a href="https://github.com/helsingborg-stad/labs-node-js-boilerplate">boilerplate</a>. For instructions on how to run the project and other tech-related information please visit the link.

The specific .env-parameters required for this project are:


AUTHSECRET (jwt secret for creating tokens)

NAVETBANKIDAPIURL (url for the navet-bankid api)
PAYMENTAPIURL (url for the payment api)

DBHOST (host for the database)
DBPORT (port for the database)
DBUSER (username for connecting)
DBPASSWORD (password for connecting)
DBNAME (name of the database)
