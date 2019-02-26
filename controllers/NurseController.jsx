// Nurse Model
const Nurse = require('./../models/Nurse');
let bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



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

// Login nurse
exports.nurse_login = (req, res) => {
    Nurse.findOne({
        accessID: req.body.accessID
    })
    .then(nurse => {
        if(nurse) {
            if(bcrypt.compareSync(req.body.password, nurse.password))
            {
                const payload = {
                    _id: nurse._id,
                    first_name: nurse.first_name,
                    last_name: nurse.last_name,
                    accessID: nurse.accessID
                }
                res.json({ status: nurse.accessID + ' registered'})
            }
            else{
                res.json({error: "Nurse does not exist"})
            }
        }
        else{
            res.json({error: "Nurse does not exist"})
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
                nurseData.password = hash
                Nurse.create(nurseData)
                .then(nurse => {
                    res.json({ status: nurse.accessID + ' registered'})
                })
                .catch(err => {
                    res.send('error: '+ err)
                })
            })
        }
        else{
            res.json({error: 'Nurse already exists'})
        }
    })
    .catch(err => {
        res.send('error: '+ err)
    })
};
   


// Edit Password
exports.change_nurse_password = (req, res) => {
    Nurse.findOneAndUpdate({ accessID: req.body.accessID }, { $set: { password: req.body.password } })
        .then(nurse => {
            bcryptjs.genSalt(10, (err, salt) =>
            {
                bcryptjs.hash(nurse.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    nurse.password = hash;
                    res.json(nurse)
                })
            })
        })
};

// Delete Nurse
exports.nurse_delete = (req, res) =>{
    Nurse.findOneAndDelete( { accessID: req.body.accessID } )
        .then(nurse => res.json({ deleted: true }))
        .catch(err => res.status(404).json({success: false}));
};