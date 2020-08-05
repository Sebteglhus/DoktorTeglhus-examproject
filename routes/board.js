const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

//define doctorControl for auth
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


//define
const boardController = require('../Controllers/BoardController');
const boardModel = require('../Models/BoardModel');
//init
const boardControl = new boardController(new boardModel);

router.get('/', doctorControl.checkLoggedIn, boardControl.renderBoard);
router.get('/new',doctorControl.checkLoggedIn, boardControl.renderNew);
router.post('/new',doctorControl.checkLoggedIn, boardControl.postMessage);
module.exports = router;