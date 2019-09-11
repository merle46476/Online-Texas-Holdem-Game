//Require Mongoose
let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let playerSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    chips: {type: Number, default: 0}
});

// Compile model from schema
let playerModel = mongoose.model('player', playerSchema );

module.exports = playerModel;
