var mongoose = require('mongoose');

class Prescription {
    constructor(patientName, medication, duration, forDisease, medStatus) {
        this.patientName = patientName;
        this.medication = medication;
        this.duration = duration;
        this.forDisease = forDisease;
        this.medStatus = medStatus; //has the med been picked up? Marked with boolean value
    }
}

module.exports = Prescription;