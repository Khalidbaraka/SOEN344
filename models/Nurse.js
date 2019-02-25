const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const NurseSchema = new Schema ({
    accessID: {
        type: String, 
        required: true,
        index: {unique: true},
        pattern: "([A-Z]{3})+([0-9]{5})"
    }, 
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
});

module.exports = Nurse = mongoose.model('nurse', NurseSchema);