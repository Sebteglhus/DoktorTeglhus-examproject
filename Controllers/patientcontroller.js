const patientClass = require('../Models/Patients');

class patientcontroller {
    constructor(patientsModel) {
        this.patientsModel = patientsModel;
    }

    renderNewPatient = async (req, res) => {
        res.render('patientRegistration');
    };
    renderPatientPage = async (req, res) => {
        res.render('patients');
    };
    RegisterPatient = async (req, res) => {
        let newPatient = new patientClass(
            req.body.pName,
            [],
            [],
            req.body.doctorName
        );
        let doctorName = req.body.doctorName;
        await this.patientsModel.insertPatient(newPatient, doctorName);
        res.render('patientRegisterSuccess');
    };
    patientSearch = async (req, res) => {
        let SearchParam = req.body.pName;
        let searchResult = await this.patientsModel.patientLookup(SearchParam);
        res.render('patientsView', {
            searchResult : searchResult
        });
        console.log(searchResult);
    };
    patientDelete = async (req, res) => {
        let DeleteParam = req.body.patientID;
        console.log(DeleteParam);
        let DeleteConfirm = await this.patientsModel.DeletePatient(DeleteParam);
        if (DeleteConfirm) {
            res.render('patients');
        } else {
            console.log("Error happening somewhere");
        }
    }
}
module.exports = patientcontroller;

