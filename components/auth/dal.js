const fs = require('fs');
const axios = require('axios');
const https = require('https');
const mysql = require('mysql');

exports.authenticate = async (pno, endUserIp) => {
    try {
        const authUserData = await authUser(pno, endUserIp);
        console.log('authud', authUserData);
            return authUserData;
    } catch (error) {
        console.log('error', error);
        return null;
    }
};

const authUser = async (pno, endUserIp) => {
    // TODO Save in config file
    const endpoint = `http://localhost:3000/bankid/api/v1/auth/`;

    const data = {
        personalNumber: pno,
        endUserIp,
        userVisibleData: 'Helsingborg stad'
    };

    return axiosClient.post(endpoint, data).then(response => {
        if (response.status !== 200) {
            console.log(response.status);
            console.log(response.data);
            return null;
        } else {
            return response.data;
        }
    });
};

// Function to bypass the whole bankid and navet step for dev purposes.
const bypassAuthUser = async (pno, endUserIp) => {
    return {
        'user': {
            'name': 'Tom Andreasson',
            'givenName': 'Tom',
            'surname': 'Andreasson',
            'personalNumber': pno,
            'navet': {
                'address': 'Drottninggatan 2',
                'zipCode': 11120,
                'city': 'Stockholm'
            }
        }
    };
};

const updateOrCreateUser = async (inputData) => {
    try {
        const user = await getUser(inputData.personalNumber);
        console.log('firstUser', user);

        // array does not exist, is not an array, or is empty
        if (!Array.isArray(user) || !user.length) {
            await createUser(inputData);
        } else {
            await updateUser(inputData);
        }

        const newUser = await getUser(inputData.personalNumber);

        console.log('newUser', newUser);

        return {
            personalNumber: newUser[0].PersonalNumber,
            name: newUser[0].Name + ' ' + newUser[0].SurName,
            givenName: newUser[0].Name,
            surName: newUser[0].SurName,
            address: newUser[0].Address,
            zipCode: newUser[0].ZipCode,
            city: newUser[0].City
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const updateUser = (inputData) => {
    return new Promise(function (resolve, reject) {
        try {
            const db = getDbConnection();

            db.connect(err => {
                if (err) throw err;
                const query = 'UPDATE users SET Name = ?, SurName = ?, Address = ?, ZipCode = ?, City = ? WHERE PersonalNumber = ?';
                const data = [
                    inputData.givenName,
                    inputData.surname,
                    inputData.navet ? inputData.navet.address : null,
                    inputData.navet ? inputData.navet.zipCode : null,
                    inputData.navet ? inputData.navet.city : null,
                    inputData.personalNumber];

                db.query(query, data, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    resolve(true);
                    console.log(results.affectedRows + ' record(s) updated');
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

const createUser = (inputData) => {
    return new Promise(function (resolve, reject) {
        try {
            const db = getDbConnection();

            db.connect(err => {
                if (err) throw err;

                const user = {
                    PersonalNumber: inputData.personalNumber,
                    Name: inputData.givenName,
                    SurName: inputData.surname,
                    Address: inputData.navet ? inputData.navet.address : null,
                    ZipCode: inputData.navet ? inputData.navet.zipCode : null,
                    City: inputData.navet ? inputData.navet.city : null
                };

                db.query('INSERT INTO users SET ?', user, function (error, results, fields) {
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
    });
};

const getUser = async (personalNumber) => {
    return new Promise(function (resolve, reject) {
        try {
            const db = getDbConnection();

            db.connect(err => {
                if (err) throw err;
                var sql = 'SELECT * FROM users WHERE PersonalNumber = ' + mysql.escape(personalNumber);
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    resolve(result);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDbConnection = () => {
    return mysql.createConnection({
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME
    });
};

const axiosClient = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        cert: fs.readFileSync(process.env.SERVERCERT),
        key: fs.readFileSync(process.env.SERVERKEY)
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});
