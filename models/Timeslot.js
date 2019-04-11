const mongoose = require('mongoose')
const Doctor = require('./Doctor');
const Schema = mongoose.Schema;

// Create Schema 
const timeslotSchema = new Schema ({
    
    doctor: { 
        required: true,
        type: Schema.Types.ObjectId, ref: 'doctor' 
    },
    start: {
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    duration:{
        type: String,
    },
    room:{
        required: true,
        type: Schema.Types.ObjectId, ref: 'room' 
    },
    clinic: {
        //required: true,
        type: Schema.Types.ObjectId,
        ref: 'clinic'
    }
});

timeslotSchema.post('remove', timeslot => {
    console.log("Removing Timeslot " + timeslot._id + " from Doctor " + timeslot.doctor.permitNumber + "'s schedule...");
    Doctor.findOne({ _id : timeslot.doctor._id}).populate('schedules')
        .then(doctor => {
            doctor.schedules.pull(timeslot._id);
            doctor.save();
        })
});

module.exports = Timeslot = mongoose.model('timeslot', timeslotSchema);

