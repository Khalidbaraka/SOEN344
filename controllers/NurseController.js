// Nurse Model
const Nurse = require('../models/Nurse');
let bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');



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
        .catch(err => console.log(err))
};

// Login nurse
exports.nurse_login = (req, res) => {
    Nurse.findOne({
        accessID: req.body.accessID
    })
    .then(nurse => {
        if(nurse && bcrypt.compareSync(req.body.password, nurse.password)) {
            res.json({
                success: true,
                message: 'Logged in!'
            });
            req.session.accessID = nurse.accessID;
            console.log(req.session);
            
        } else {
            res.json({
                success: false,
                message: 'Incorrect id or password'
            });
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
};

// Create/Register nurse
exports.nurse_register = (req, res) => {
   
    const nurseData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        accessID: req.body.accessID,
        password: req.body.password
    }

    Nurse.findOne({
        accessID: req.body.accessID
    })
    .then(nurse => {
        if(!nurse)
        {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                nurseData.password = hash;
                Nurse.create(nurseData)
                .then(nurse => {
                    res.json({
                        success: true,
                        message: 'Signed up!'
                    });
                })
                .catch(err => {
                    res.json({
                        success: false,
                        message: 'Error: Server error'
                    });
                })
            })
        }
        else {
            res.json({
                success: false,
                message: 'Nurse already exists'
            });
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
};

// Edit Password
exports.change_nurse_password = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        Nurse.findOneAndUpdate({ accessID: req.body.accessID }, { $set: {password: hash}})
            .then(updatedNurse => res.json(updatedNurse))
    })
};

// Delete Nurse
exports.nurse_delete = (req, res) =>{
    Nurse.findOneAndDelete( { accessID: req.body.accessID } )
        .then(nurse => res.json({ deleted: true }))
        .catch(err => res.status(404).json({success: false}));
};
