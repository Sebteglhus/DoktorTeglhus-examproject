const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Board = require('../Models/Board');
app.use(express.urlencoded({extended: false}));

class boardModel {
    async createMessage(newMessage) {
        mongoose.connection.db.collection("BulletBoardDB").insertOne(newMessage, function(err, res) {
            if (err) throw err;
        });
    }
    async loadMessages() {
        return mongoose.connection.db.collection("BulletBoardDB")
            .find({}, {projection:{_id:0}})
            .toArray();
    }
}

module.exports = boardModel;
