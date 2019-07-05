const fs = require('fs');
const axios = require('axios');
const https = require('https');


exports.postNotifcations = async (notification) => {
    try {
        const endpoint = `${process.env.NOTIFICATION}/`;
        const data = {
            notification,
        }
        return axiosClient.post(endpoint, data).then(response => {
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

exports.getNotifications= async (data) => {
    try {
        const endpoint = `${process.env.NOTIFICATION}/`;
    
        return axiosClient.get(endpoint, data).then(response => {
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