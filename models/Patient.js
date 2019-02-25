const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creating patient schema
const PatientSchema = new Schema ({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
