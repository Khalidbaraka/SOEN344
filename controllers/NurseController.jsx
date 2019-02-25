// Nurse Model
const Nurse = require('./../models/Nurse');

// Display list of all Nurse
exports.nurse_list = (req, res) => {
    Nurse.find()
        .sort({ accessID: -1 })
        .then(nurses => res.json(nurses))
};

// Create/Register nurse
exports.nurse_register = (req, res) => {
    Nurse.find({ accessID: req.body.accessID })
        .then(nurse => {
            if(nurse == null){
                const newNurse = new Nurse({
                    accessID: req.body.accessID,
                    password: req.body.password
                });
                newNurse.save()
                    .then(nurse => res.json(nurse));
            }else{
                return res.status(400).json({ accessID: 'accessID is already in the system' });
            }
        })
};