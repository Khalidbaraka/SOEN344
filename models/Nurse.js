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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    clinic: {
        //required: true,
        type: Schema.Types.ObjectId,
        ref: 'clinic'
    }
});

module.exports = Nurse = mongoose.model('nurse', NurseSchema);