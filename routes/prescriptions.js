const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

//define
const PrescriptionController = require('../Controllers/PrescriptionsController');
const PrescriptionModel = require('../Models/PrescriptionsModel');
//init
const PrescriptionControl = new PrescriptionController(new PrescriptionModel);

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
router.get('/create', doctorControl.checkLoggedIn, PrescriptionControl.renderPrescriptionAdd); //works
router.post('/create', doctorControl.checkLoggedIn, PrescriptionControl.postPrescription); //Works!


module.exports = router;

