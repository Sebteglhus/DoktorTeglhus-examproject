//base setup
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000; //Defining the localhost port for the application to run on
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override'); //Using DELETE method as a replacement for POST


app.listen(PORT, console.log(`Server now running on ${PORT}`));
app.use(express.urlencoded({extended: false}));
app.use(flash());

//passing basic options to express-session
app.use(session({
    secret: 'REDACTED!',
    resave: false,
    saveUninitialized: false
    }));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//EJS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/doctors'));
app.use('/patients', require('./routes/patients'));
app.use('/Prescriptions', require('./routes/prescriptions'));
app.use('/Board', require('./routes/board'));
app.use('/Diseases', require('./routes/diseases'));


//Setting up MongoDB connection----
//importing URI
const db = require('./Models/config').MongoURI;

//connecting to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connection to DB establised.'))
    .catch(err => console.log(err));



