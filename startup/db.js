const winston = require('winston');
const mongoose = require("mongoose");

module.exports = function(){
    mongoose
  .connect("mongodb://localhost/walletaid-api-node")
  .then(() => winston.info("connected to mongoDB"));
}