const User = require('./../models/User');

function userAdd(data, cb) {
    let newUser = new User(data);
    newUser.save(function (err, user) {
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    });
}

function userGet(data, cb) {
    let email = data.email;
    User.findOne({ 'email': email }).exec((err, user) => {
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    })
}

async function userGetByEmail(email) {
    let user = null;
    try {
        user = await User.findOne({ 'email': email });
    } catch {
    }
    return user;
}


async function userGetById(id, cb) {
    let user = null;
    try {
        user = await User.findOne({ '_id': id });
    } catch {
    }
    return user;
}



module.exports = {
    add: userAdd,
    get: userGet,
    getByEmail: userGetByEmail,
    getById: userGetById
}