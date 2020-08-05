class Diseases {
    constructor(patientName, diseaseName, symptoms, status) {
        this.patientName = patientName;
        this.diseaseName = diseaseName;
        this.symptoms = symptoms;
        this.status = status; //is patient still sick? Boolean
    }
}

module.exports = Diseases;