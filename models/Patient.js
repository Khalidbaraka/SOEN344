const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creating patient schema
const PatientSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    patientID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = patient = mongoose.model('patient', PatientSchema);