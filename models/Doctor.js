const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const DoctorSchema = new Schema ({
    permit_number: {
        required: true,
        unique: true,
        type: Number,
        min : 0000001,
        max : 9999999
    }, 
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = Doctor = mongoose.model('doctor', DoctorSchema);