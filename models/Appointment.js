const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const AppointmentSchema = new Schema ({
    dateCreated: {
        required: true,
        type: Date,
    }, 
    dateFor: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    clinic: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'Clinic'
    },
    doctor: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'Doctor' 
    },
    patient: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'Patient' 
    },
    room: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'Room' 
    },
    startTime: {
        require: true,
        type: String
    },
    duration:{
        type: String,
        require: true
    },
    endTime:{
        type: String,
    },
    price:{
        type: Number,
        require: true,
        min: 0,
        max:1000
    }
});

module.exports = Appointment = mongoose.model('appointment', AppointmentSchema);