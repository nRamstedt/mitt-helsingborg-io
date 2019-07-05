const fs = require('fs');
const axios = require('axios');
const https = require('https');
const mysql = require('mysql');

exports.authenticate = async (pno, endUserIp) => {
    // TODO Save in config file
    const endpoint = `http://localhost:3000/api/v1/bankid/auth/`;

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

exports.collect = async (orderRef) => {
    // TODO Save in config file
    const endpoint = `http://localhost:3000/api/v1/bankid/collect/`;



    return axiosClient.post(endpoint, orderRef).then(response => {
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
