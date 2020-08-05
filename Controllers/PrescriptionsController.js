const PrescriptionClass = require('../Models/Prescriptions');

//defining the prescriptionsController, for handling prescriptions
class PrescriptionsController {
    constructor(PrescriptionsModel) {
        this.PrescriptionsModel = PrescriptionsModel;
    }
    //rendering
    renderPrescriptionAdd = async (req, res) => {
        let allPatients = "";
        console.log(allPatients);
        res.render('PrescriptionCreation');
    };
    //inserting prescriptions
    postPrescription = async (req, res) => {
        let newPrescription = new PrescriptionClass(
            req.body.pName,
            req.body.mName,
            req.body.durationTime,
            req.body.diseaseType,
            "1" //default to true, as newly created prescription hasn't yet been picked up.
        );
        let forPatient = req.body.pName;
        //awaiting mongo response through the model, while rendering the confirmation view
        await this.PrescriptionsModel.insertPrescription(newPrescription, forPatient);
        res.render('PrescriptionCreated');
    }
}

module.exports = PrescriptionsController;