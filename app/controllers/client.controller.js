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

async function clientList() {
    let clients = null;
    try {
        clients = await Client.find().lean();
    } catch {
    }
    return clients;
}

async function clientGetById(id) {
    let client = null;
    console.log('aliga')
    try {
        client = await Client.findOne({ '_id': '6374c4d2c759afcc73f9aaa3' }).lean();
        console.log('tutaj będzie klient')
        console.log(client);
        // client = await Client.findOne({ '_id': id }).lean();
    } catch(error) {

        console.log(error)

    }
    return client;
}

module.exports = {
    add: clientAdd,
    list: clientList,
    getById: clientGetById

}