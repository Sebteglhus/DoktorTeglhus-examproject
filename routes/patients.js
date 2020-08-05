const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const patientsController = require('../Controllers/patientcontroller');
const patientsModel = require('../Models/PatientsModel');

const patientsControl = new patientsController(new patientsModel);

const doctorsController = require('../Controllers/DoctorController');
const doctorModel = require('../Models/DoctorModel');

const doctorControl = new doctorsController(new doctorModel);
//Initializing passport authentication
doctorControl.initialize(
    passport,
    username => doctorControl.doctorModel.findDoctorByUsername(username),
    Id => doctorControl.doctorModel.findUserById(Id)
);

router.get('/view', doctorControl.checkLoggedIn, patientsControl.renderPatientPage);
router.get('/', doctorControl.checkLoggedIn, patientsControl.renderPatientPage);
router.get('/create', doctorControl.checkLoggedIn, patientsControl.renderNewPatient);
router.post('/register', doctorControl.checkLoggedIn, patientsControl.RegisterPatient);

router.post('/search', doctorControl.checkLoggedIn, patientsControl.patientSearch);
router.delete('/delete', doctorControl.checkLoggedIn, patientsControl.patientDelete);

module.exports = router;