const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const AppointmentSchema = new Schema ({
    dateCreated: {
        type: Date,
        Default: Date.now
    }, 
    type: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    clinic: { 
        //It is not required now, till we figure out what we wanna do for clinic, right now clinics are being null when creating appointments
       // required: true,
        type: Schema.Types.ObjectId, ref: 'clinic'
    },
    doctor: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'doctor' 
    },
    patient: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'patient' 
    },
    room: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'room' 
    },
    start: {
        required: true,
        type: Date
    },
    duration:{
        type: String,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0,
        max:1000
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);