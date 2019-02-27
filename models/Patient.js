const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Creating patient schema
const PatientSchema = new Schema ({

    healthCardNumber: {
        type: String, 
        required: true,
        index: {unique: true}
    },
    birthday: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    physicalAddress: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
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
