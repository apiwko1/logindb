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

function userGet(data, cb){
    let email = data.email;
    User.findOne({'email': email}).exec((err, user) =>{
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    })
}

async function userGetByEmail(email, cb){
    
    const user = await User.findOne({'email': email}); 
    // console.log(user);
    return user;
    // User.findOne({'email': email}).exec((err, user) =>{
    //     if (err) {
    //         cb(err);
    //     } else {
    //         console.log(user)
    //         cb(null, user);
    //     }
        
    // })
}


function userGetById(id, cb){
    
    User.findOne({'_id': id}).exec((err, user) =>{
        if (err) {
            cb(err);
        } else {
            cb(null, user);
        }
    })
}



module.exports = {
    add: userAdd,
    get: userGet, 
    getByEmail: userGetByEmail, 
    getById: userGetById
}