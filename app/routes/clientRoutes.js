const express = require('express');
const router = express.Router();
const clientController = require('./../controllers/client.controller')


router.get('/', async (req, res) => {
    const clients = await  clientController.list();
    console.log(clients);
    res.render('clients', {clients});
})

router.get('/details/:id', async (req, res) => {
    let id = req.params.id;
    const client = await clientController.getById({'_id': id});
    res.render('clientDetails', client);
})

router.post('/add', async (req, res) => {
    try {

        let data = {
            name: req.body.name,
            street: req.body.street,
            city: req.body.city,             
            nip: req.body.nip
        }
        console.log(data);
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