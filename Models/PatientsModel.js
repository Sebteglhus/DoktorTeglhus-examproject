const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({extended: false}));

class PatientsModel {
    async insertPatient(newPatient, doctorName) {
        mongoose.connection.db.collection("PatientsDB").insertOne(newPatient, function (err, res) {
            if (err) throw err;
        });
        mongoose.connection.db.collection("DoctorsDB").updateOne(
            {doctorname : doctorName},
            {$push: {"patients": newPatient}}
        );
    }
    async patientLookup(SearchParam) {
        return mongoose.connection.db.collection("PatientsDB")
            .find( { "name" : SearchParam } )
            .toArray()
    }
    async DeletePatient(DeleteParam) {
        return mongoose.connection.db.collection("PatientsDB").
        deleteOne( {_id : mongoose.Types.ObjectId(DeleteParam)});
    }
}
module.exports = PatientsModel;
