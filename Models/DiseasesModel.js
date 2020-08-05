const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Disease = require('../Models/Diseases');
app.use(express.urlencoded({extended: false}));

class DiseasesModel {
    async insertDisease(newDisease, forPatient) {
        mongoose.connection.db.collection("PatientsDB").updateOne(
            {name: forPatient},
            {$push: {"diseases": newDisease}}
        );
    }
}

module.exports = DiseasesModel;