const Client = require('./../models/Client');

async function clientAdd(data, cb) {
    let newClient = new Client(data);
    newClient.save(function (err, client) {
        if (err) {
            cb(err);
        } else {
            cb(null, client);
        }
    });
}


module.exports = {
    add: clientAdd,

}