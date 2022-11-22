const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


const userController = require('./../controllers/user.controller');

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

router.get('/', checkAuthenticated, async (req, res) => {
    const user = await req.user;
    console.log(user);
    
    res.render('index', { name: req.user.name });
    // res.redirect('/clients');
    // res.send(req.user);
})


router.get('/login', checkNotAuthenticated, (req, res) => {

    res.render('login');
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        await userController.add(data, (err, user) => {
            console.log(user);
        })
        console.log('abc')
        res.redirect('/login');
    } catch (e) {
        console.log(e)
        res.redirect('/register');
    }

})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/clients',
    failureRedirect: '/register',
    failureFlash: true
}))

router.delete('/logout', (req, res) => {
    req.logOut(err => {
        if (err) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });

})


module.exports = router;