if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const userController = require('./app/controllers/user.controller')

const initializePassport = require('./passport-config');
initializePassport(passport,
    //email => { return users.find(user => user.email === email) } , 
    async email =>  await userController.getByEmail(email),
    // id => users.find(user=> user.id===id)
    async id => await userController.getById(id, (err, user) => { })
);



const path = require('path');
const hbs = require('express-handlebars');
const { urlencoded } = require('express');
const { emitWarning } = require('process');
app.engine('hbs', hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use(urlencoded({ extended: false }))

app.use(flash());
console.log('process.env.SESSION_SECRET');
console.log(process.env.SESSION_SECRET);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));



const mainRouter = require('./app/routes/mainRoutes');
const { db } = require('./app/models/User');
app.use('/', mainRouter);

app.listen(8080);
