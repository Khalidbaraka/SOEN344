// Patient Model
const Patient = require('./../models/Patient');

//  Callback functions that they will invoke on our routes

// Display list of all items.
exports.patient_list = (req, res) => {
    Patient.find().then(patients => res.json(patients))
}
