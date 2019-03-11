const mongoose = require('mongoose');
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
    }
});

module.exports = Timeslot = mongoose.model('timeslot', timeslotSchema);