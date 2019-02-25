// Nurse Model
const Nurse = require('./../models/Nurse');
let bcryptjs = require('bcryptjs');

// Display list of all Nurse
exports.nurse_list = (req, res) => {
    Nurse.find()
        .sort({ accessID: -1 })
        .then(nurses => res.json(nurses))
};

// Find NurseByAccessID
exports.nurse_by_access_id = (req, res) => {
    Nurse.findOne({ accessID: req.body.accessID })
        .then(nurse => res.json(nurse))
};

// Create/Register nurse
exports.nurse_register = (req, res) => {
    Nurse.findOne({ accessID: req.body.accessID })
        .then(nurse => {
            if(nurse == null){
                const newNurse = new Nurse({
                    accessID: req.body.accessID,
                    password: req.body.password
                });
                bcryptjs.genSalt(10, (err, salt)) =>{
                    bcryptjs.hash(newNurse.password, salt, (err, hash) => {
                        if(err){
                            throw err;
                        }
                        newNurse.password=hash;
                        newNurse.save().then(nurse => res.json(nurse));
                    })
                }
            }else{
                return res.status(400).json({ accessID: 'accessID is already in the system' });
            }
        })
};

// Edit Password
exports.change_nurse_password = (req, res) => {
    Nurse.findOneAndUpdate({ accessID: req.body.accessID }, { $set: { password: req.body.password } })
        .then(nurse => {
            bcryptjs.genSalt(10, (err, salt)) =>
            {
                bcryptjs.hash(nurse.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    nurse.password = hash;
                    res.json(nurse)
                })
            }
        })
};

// Delete Nurse
exports.nurse_delete = (req, res) =>{
    Nurse.findOneAndDelete( { accessID: req.body.accessID } )
        .then(nurse => res.json({ deleted: true }))
        .catch(err => res.status(404).json({success: false}));
};