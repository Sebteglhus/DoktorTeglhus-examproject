const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: false}));

class DoctorModel {
    async insertDoctor(newDoctor) {
        mongoose.connection.db.collection("DoctorsDB").insertOne(newDoctor, function(err, res) {
            if (err) throw err;
        });
        console.log(newDoctor);
    }
    async findDoctorByUsername(username) {
        return mongoose.connection.db.collection("DoctorsDB")
            .findOne({ username : username });
    }
    async findUserById(Id) {
        return mongoose.connection.db.collection("DoctorsDB")
            .findOne({ _id : Id });
    }
}
module.exports = DoctorModel;
