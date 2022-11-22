const express = require('express');
const router = express.Router();
const clientController = require('./../controllers/client.controller');
const actionController = require('./../controllers/action.controller');

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

router.get('/', checkAuthenticated,  async (req, res) => {
    const user = await req.user;
    
   // const clients = await  clientController.list();
    let userId = user._id;
    const clients = await clientController.ownList(userId);


    // console.log(clients);
    res.render('clients', {clients});
})

router.get('/details/:id', checkAuthenticated,  async (req, res) => {
    let id = req.params.id;
    let user = await req.user;
    userId = user._id;
    console.log(user);
    const client = await clientController.getById({'_id': id});
    const actions = await actionController.list(id);
    
    
    res.render('clientDetails', {client, actions});
})

router.post('/addAction',   async (req, res)=> {
    let myClient = await req.user;
    
    let clientId = req.body.clientId;

    console.log('teraz log client')
    console.log(myClient);
    let data = {
        client: clientId,
        'date': req.body.date, 
        'type': req.body.type, 
        'description': req.body.desc
    }
    await actionController.add(data);
    res.redirect('/clients/details/' + clientId)
    // res.redirect('/clients')
//        
    
})


router.post('/add', checkAuthenticated,  async (req, res) => {
    
    try {
        let user = await req.user;
        userId = user._id;
        // console.log('moje user id' );
        // console.log(user);
        let data = {
            user: userId,
            name: req.body.name,
            street: req.body.street,
            city: req.body.city,             
            nip: req.body.nip
        }
        // console.log(data);
        await clientController.add(data, (err, client) => {
            console.log(client);
        })        
        res.redirect('/clients');

    } catch (e) {
        console.log(e);
        res.redirect('/clients');

    }

})


module.exports = router;