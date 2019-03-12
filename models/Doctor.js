const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const DoctorSchema = new Schema ({
    permitNumber: {
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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    },
    appointments: [{
        type: Schema.Types.ObjectId, 
        ref: 'appointment' 
    }],
    
    schedules: [{
            type: Schema.Types.ObjectId, 
            ref: 'timeslot' 
    }]

});

module.exports = Doctor = mongoose.model('doctor', DoctorSchema);
