const Doctor = require('../Models/DoctorModel');
const DoctorClass = require('../Models/Doctor');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

class DoctorController {
    constructor(doctorModel) {
        this.doctorModel = doctorModel;
    }
    renderLoginPage = (req, res) => res.render('login');

    renderRegisterPage = (req, res) => res.render('Register');

    createNewDoctor =
        async (req, res) => {
            const hashedPassword = await bcrypt.hash(req.body.doctorPassword, 12);
            let newDoctor = new DoctorClass(
                req.body.doctorName,
                hashedPassword,
                req.body.doctorUsername,
                []
            );
            await this.doctorModel.insertDoctor(newDoctor);
            res.render('registersuccess');
        };

    initialize(passport, findDoctorByUsername, getUserById) {
        const AuthenticateUser = async (username, password, done) => {
            const user = await this.doctorModel.findDoctorByUsername(username);
            if (user == null) {
                return done(null, false, {message: "no user with that username. Contact admin to have one created, or try again"})
            }
            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: "Wrong password"})
                }
            } catch (e) {
                return done(e)
            }
        };
        passport.use(new LocalStrategy({usernameField: 'username'}, AuthenticateUser));
        passport.serializeUser((user, done) => done(null, user._id));
        passport.deserializeUser((id, done) => {
            return done(null, this.doctorModel.findUserById(id))
        });
    }
    checkNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/Home')
        }
        next()
    }
    checkLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/users/login')
    }
}

module.exports = DoctorController;