const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const RoomSchema = new Schema ({
    number: {
        type: Number,
        required: true
    },
    appointments: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'appointment' 
    }]
});

module.exports = Room = mongoose.model('room', RoomSchema);