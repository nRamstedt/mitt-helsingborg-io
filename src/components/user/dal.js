const axios = require('axios');
const https = require('https');
const mysql = require('mysql');
const logger = require('../../utils/logger');
const { throwCustomDomainError } = require('../../utils/error');
const jsonapi = require('../../jsonapi');

const createErrorResponse = async (error, res) => {
    logger.info(error.status);
    logger.info(error.data);
    const serializedData = await jsonapi.serializer.serializeError(error);
    return res.status(error.status).json(serializedData);
};

const tryAxiosRequest = async (callback) => {
    try {
        const response = await callback();
        return response;
    } catch (error) {
        logger.info(error);
        throwCustomDomainError(error.response.status);
        return undefined;
    }
};

const updateUser = inputData => new Promise(((resolve, reject) => {
    try {
        const db = getDbConnection();

        db.connect((err) => {
            if (err) throw err;
            const query = 'UPDATE users SET Name = ?, SurName = ?, Address = ?, ZipCode = ?, City = ? WHERE PersonalNumber = ?';
            const data = [
                inputData.givenName,
                inputData.surname,
                inputData.navet ? inputData.navet.address : null,
                inputData.navet ? inputData.navet.zipCode : null,
                inputData.navet ? inputData.navet.city : null,
                inputData.personalNumber];

            db.query(query, data, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(true);
                console.log(`${results.affectedRows} record(s) updated`);
            });
        });
    } catch (error) {
        reject(error);
    }
}));

const createUser = inputData => new Promise(((resolve, reject) => {
    try {
        const db = getDbConnection();

        db.connect((err) => {
            if (err) throw err;

            const user = {
                PersonalNumber: inputData.personalNumber,
                Name: inputData.givenName,
                SurName: inputData.surname,
                Address: inputData.navet ? inputData.navet.address : null,
                ZipCode: inputData.navet ? inputData.navet.zipCode : null,
                City: inputData.navet ? inputData.navet.city : null,
            };

            db.query('INSERT INTO users SET ?', user, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                resolve(results.insertId);
            });
        });
    } catch (error) {
        reject(error);
    }
}));

const getUserFromDatabase = async personalNumber => new Promise(((resolve, reject) => {
    try {
        const db = getDbConnection();

        db.connect((err) => {
            if (err) throw err;
            const sql = `SELECT * FROM users WHERE PersonalNumber = ${mysql.escape(personalNumber)}`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
    } catch (error) {
        reject(error);
    }
}));

const getDbConnection = () => mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
});

const axiosClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        cert: process.env.CERT,
        key: process.env.KEY,
    }),
    headers: {
        'Content-Type': 'application/json',
    },
});


/**
 * READ RESOURCE METHODS
 */

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const endpoint = `${process.env.NAVETURL}/user/${id}`;
        console.log(endpoint);
        const response = await tryAxiosRequest(() => axiosClient.get(endpoint));

        return res.json(response.data);
    } catch (error) {
        return createErrorResponse(error, res);
    }
};

const read = {
    user: getUser,
};


module.exports = {
    read,
};
