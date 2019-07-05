const mysql = require('mysql');

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

const getUserFromDatabase= async (personalNumber) => {
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

exports.getUser= async (personalNumber) => {
    try {
        const endpoint = `${process.env.NAVETURL}/`;
    
        return axiosClient.get(endpoint, personalNumber).then(response => {
            if (response.status !== 200) {
                console.log(response.status);
                console.log(response.data);
                return null;
            } else {
                return response.data;
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};