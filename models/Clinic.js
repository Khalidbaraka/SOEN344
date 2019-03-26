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
    	ref: 'doctor' 
    }],
    nurses: [{
        type: Schema.Types.ObjectId,
        ref: 'nurse'
    }],
    /* While appointment model does have the information about a dcotor and room,
    * we assumed that a clinic has a set of predefined doctors and rooms. */
    appointments: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'appointment' 
    }],
    // A clinic has a number of rooms. This is required.
    rooms: [{
        //required: true,
        type: Schema.Types.ObjectId,
        ref: 'room'
    }]
});

module.exports = Clinic = mongoose.model('clinic', ClinicSchema);