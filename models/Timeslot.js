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
    }
});
//Method verifies if parameters (start, end) representing date for possible new timeslot overlaps with existing timeslot
timeslotSchema.methods.overlaps = function overlaps (start, end) {
    return ((start >= this.start && start <= this.end) || (end >= this.start && end <= this.end) 
    || (start >= this.start && start <= this.end) || (end >= this.start && end <= this.end)
)}


module.exports = Timeslot = mongoose.model('timeslot', timeslotSchema);