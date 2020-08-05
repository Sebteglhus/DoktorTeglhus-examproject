const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

//define
const DiseasesController = require('../Controllers/DiseasesController');
const DiseasesModel = require('../Models/DiseasesModel');
//init
const DiseasesControl = new DiseasesController(new DiseasesModel);

//define
const doctorsController = require('../Controllers/DoctorController');
const doctorModel = require('../Models/DoctorModel');
//init
const doctorControl = new doctorsController(new doctorModel);

//Initializing passport authentication
doctorControl.initialize(
    passport,
    username => doctorControl.doctorModel.findDoctorByUsername(username),
    Id => doctorControl.doctorModel.findUserById(Id)
);

//Routes
router.get('/create', doctorControl.checkLoggedIn, DiseasesControl.renderAddDisease); //works
router.post('/create', doctorControl.checkLoggedIn, DiseasesControl.postDisease); //doesnt work!


module.exports = router;