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
    },
    doctors: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Doctor' 
    }],
    appointments: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'appointment' 
    }]
});

module.exports = Clinic = mongoose.model('clinic', ClinicSchema);