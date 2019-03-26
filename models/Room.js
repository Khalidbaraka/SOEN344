const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const RoomSchema = new Schema ({
    number: {
        type: String,
        required: true
    },
    appointments: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'appointment' 
    }],
    clinic: {
        //required: true,
        type: Schema.Types.ObjectId,
        ref: 'clinic'
    }
});

module.exports = Room = mongoose.model('room', RoomSchema);