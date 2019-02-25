const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creating patient schema
const PatientSchema = new Schema ({

    healthCardNumber: {
        type: String, 
        required: true,
        index: {unique: true}
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
