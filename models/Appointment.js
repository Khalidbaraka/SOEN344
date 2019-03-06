const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const AppointmentSchema = new Schema ({
    dateCreated: {
        required: true,
        type: Date,
    }, 
    type: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    clinic: { 
        required: true,
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
        require: true,
        min: 0,
        max:1000
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);