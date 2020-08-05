const DiseasesClass = require('../Models/Diseases');

class DiseasesController {
    constructor(DiseasesModel) {
        this.DiseasesModel = DiseasesModel;
    }
    renderAddDisease = async (req, res) => {
        res.render('Diseases');
    };
    postDisease = async (req, res) => {
        let newDisease = new DiseasesClass(
            req.body.pName,
            req.body.dName,
            req.body.dSymptoms,
            1
        );
        let forPatient = req.body.pName;
        this.DiseasesModel.insertDisease(newDisease, forPatient);
        res.render('SignedInHome');
    }
}

module.exports = DiseasesController;