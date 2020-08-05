const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Prescription = require('../Models/Prescriptions');
app.use(express.urlencoded({extended: false}));
let allPatients = "";
let allDoctors = "";
class Model {
    constructor(doctorsCollection, patientsCollection) {
        this.doctorsCollection = doctorsCollection;
        this.patientsCollection = patientsCollection;
    }
    async insertDoctor(newDoctor) {
        mongoose.connection.db.collection("DoctorsDB").insertOne(newDoctor, function(err, res) {
            if (err) throw err;
        });
        console.log(newDoctor);
    }
    async insertPatient(newPatient) {
        mongoose.connection.db.collection("PatientsDB").insertOne(newPatient, function (err, res) {
            if (err) throw err;
        });
        console.log(newPatient);
    }
    async insertPrescription(newPrescription) {
        mongoose.connection.db.collection("PrescriptionsDB").insertOne(newPrescription, function (err, res) {
            if (err) throw err;
        });
        console.log(newPrescription);
    }
    async loadDoctorsArray() {
        mongoose.connection.db.collection("DoctorsDB").find()
            .toArray((error, result) =>
            {
                if (error) throw error;
                console.log(result);
                allDoctors = result;
            });
    }
}
async function loadDoctorsArray() {
    mongoose.connection.db.collection("DoctorsDB").find()
        .toArray((error, result) =>
        {
            if (error) throw error;
            console.log(result);
            allDoctors = result;
        });
}
module.exports = Model;
