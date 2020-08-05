const boardClass = require('../Models/Board');

//defining the controller of the board aspect of the application
class boardController {
    constructor(boardModel) {
        this.boardModel = boardModel;
    }
    renderBoard = async(req, res) => {
        let allMessages  = await this.boardModel.loadMessages();
        res.render('Board', {
            Messages: allMessages
        });
    };
    renderNew = async (req, res) => {
        res.render('NewBoardMsg');
    };
    postMessage = async (req, res) => {
        let newMessage = new boardClass(
            req.body.fromDoctorName,
            req.body.messageContent
        );
        this.boardModel.createMessage(newMessage);
        res.redirect('/Board');
    };
}
module.exports = boardController;