const express = require('express');
const router = express.Router();
const server = require('../Controllers/patientcontroller');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const doctorsController = require('../Controllers/DoctorController');
const doctorModel = require('../Models/DoctorModel');

const doctorControl = new doctorsController(new doctorModel);
//Initializing passport authentication
doctorControl.initialize(
    passport,
    username => doctorControl.doctorModel.findDoctorByUsername(username),
    Id => doctorControl.doctorModel.findUserById(Id)
);

router.get('/', doctorControl.checkNotLoggedIn, (req, res) => res.render('Homepage'));
module.exports = router;