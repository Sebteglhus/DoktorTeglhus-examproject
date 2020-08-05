const PrescriptionClass = require('../Models/Prescriptions');

class PrescriptionsController {
    constructor(PrescriptionsModel) {
        this.PrescriptionsModel = PrescriptionsModel;
    }
    renderPrescriptionAdd = async (req, res) => {
        let allPatients = "";
        this.PrescriptionsModel.loadPatientsArray();
        console.log(allPatients);
        res.render('PrescriptionCreation');
    };
    postPrescription = async (req, res) => {
        let newPrescription = new PrescriptionClass(
            req.body.pName,
            req.body.mName,
            req.body.durationTime,
            req.body.diseaseType,
            "1" //default to true, as newly created prescription hasn't yet been picked up.
        );
        let forPatient = req.body.pName;
        await this.PrescriptionsModel.insertPrescription(newPrescription, forPatient);
        res.render('PrescriptionCreated');
    }
}

module.exports = PrescriptionsController;