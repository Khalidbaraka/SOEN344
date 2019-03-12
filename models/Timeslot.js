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

timeslotSchema.post('remove', timeslot => {
    console.log("Removing Timeslot " + timeslot._id + " from Doctor" + timeslot.doctor.permitNumber + "'s schedule");
    this.model('Doctor').update(
        { _id: timeslot.doctor._id },
        { "$pull": { "schedules": { "_id": timeslot._id } }},
        (err, obj) => {
            console.log(err, obj);
        });
});

module.exports = Timeslot = mongoose.model('timeslot', timeslotSchema);

