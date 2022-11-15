const express = require('express');
const router = express.Router();
const clientController = require('./../controllers/client.controller')


router.get('/', (req, res) => {
    res.render('clients');
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
        console.log('abc');
        res.redirect('/clients');

    } catch (e) {
        console.log(e);
        res.redirect('/clients');

    }

})


module.exports = router;