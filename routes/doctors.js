//requiring libraries
const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

//defining the MVC paths for all operations regarding Doctor (logins)
const doctorsController = require('../Controllers/DoctorController');
const doctorModel = require('../Models/DoctorModel');

//creating new DoctorController
const doctorControl = new doctorsController(new doctorModel);

//Initializing passport through doctorControl
doctorControl.initialize(
    passport,
    username => doctorControl.doctorModel.findDoctorByUsername(username),
    Id => doctorControl.doctorModel.findUserById(Id)
);


//Routes
router.get('/login', doctorControl.checkNotLoggedIn, doctorControl.renderLoginPage);
router.get('/register', doctorControl.checkLoggedIn, doctorControl.renderRegisterPage);
router.post('/register', doctorControl.checkLoggedIn, doctorControl.createNewDoctor);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/board',
    failureRedirect: '/users/login',
    failureFlash: true
})); //setting the different passport.js options for redirecting and flashing failures

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
}); //creating the path for logging a user out -- this path is used across all routes

module.exports = router;