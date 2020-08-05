const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Prescription = require('../Models/Prescriptions');
app.use(express.urlencoded({extended: false}));

class PrescriptionsModel {
    async insertPrescription(newPrescription, forPatient) {
        mongoose.connection.db.collection("PrescriptionsDB").insertOne(newPrescription, function (err, res) {
            if (err) throw err;
        });
        console.log(newPrescription);
        mongoose.connection.db.collection("PatientsDB").updateOne(
            {name: forPatient},
            {$push: {"prescriptions": newPrescription}}
        );
    }


    async loadPatientsArray() {
        let allPatients = "";
        mongoose.connection.db.collection("PatientsDB").find()
            .project( {_id: 1} )
            .map(x => x._id)
            .toArray((error, result) => {
                if (error) throw error;
                console.log(result);
                allPatients = result;
            });

    }
}

module.exports = PrescriptionsModel;
