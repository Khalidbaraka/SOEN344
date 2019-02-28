const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const ClinicSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = Clinic = mongoose.model('clinic', ClinicSchema);