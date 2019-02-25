const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const NurseSchema = new Schema ({
    accessID: {
        type: String, 
        required: true,
        index: {unique: true}
    }, 
    password: {
        type: String,
        required: true
    },
});

module.exports = Nurse = mongoose.model('nurse', NurseSchema);