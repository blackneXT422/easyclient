

var Auth = {
    auth(ipAddress, port, callback) {
        let axios = require('axios');
        let url = `http://${ipAddress}:${port}/v2.0/tokens`;
        console.log('auth url is ' + url);
        let postData = {
            "auth": {
                "tenantName": "admin",
                "passwordCredentials": {
                    "username": "admin",
                    "password": "contrail123"
                }
            }
        };
        axios.post(url, postData).then((response) => {
            let authToken = response.data.access.token.id;
            callback(authToken);
        });
    }
};

module.exports = Auth;