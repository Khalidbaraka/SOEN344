//Doctor Model
const Doctor = require('./../models/Doctor');
var bcryptjs = require('bcryptjs');

//  Callback functions for the routes

//Create / register
exports.doctor_register = (req, res) =>{
	Doctor.findOne({permit_number : req.body.permit_number})
		.then(doctor =>{
			if(doctor){
				return res.status(400).json({permit_number: 'Doctor with this permit number already exists'});
            } else {
                const newDoctor = new Doctor({
                    permit_number: req.body.permit_number,
                    password: req.body.password,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    speciality: req.body.speciality,
                    city: req.body.city
                });

                bcryptjs.genSalt(10,(err, salt)=>{
                    bcryptjs.hash(newDoctor.password, salt, (err,hash)=>{
                        if(err) {throw err;}
                        newDoctor.password=hash;
                        newDoctor.save().then(doctor => res.json(doctor)).catch(err=>console.log(err));
                    })
                })
            }
        });
}

//Read / getList
exports.doctor_get_list = (req, res) =>{
	Doctor.find().then(doctors => res.json(doctors))
}

//Read / get by permit number
exports.doctor_get_by_permit = (req, res) =>{
	Doctor.findOne({permit_number: req.body.permit_number})
		.then(doctor => res.json(doctor))
}

//Login
exports.doctor_login = (req, res) =>{
    Doctor.findOne({permit_number: req.body.permit_number})
        .then(doctor => {
            if(doctor){
                if(bcryptjs.compareSync(req.body.password, doctor.password)){
                    const foundDoctor = {
                        permit_number: doctor.permit_number,
                        first_name: doctor.first_name,
                        last_name: doctor.last_name,
                        speciality: doctor.speciality,
                        city: doctor.city
                    }
                    res.json({
                        success: true,
                        message: ' Dotor logged in succesfully'
                    })
                }
                else {
                    res.json({
                        success: false,
                        message: 'Incorrect Permit Number or Password'
                    })
                }
            }
            else{
                res.json({
                    sucess: false,
                    message: 'Incorrect Permit Number or Password'
                })
            }
        })
}

//Update
exports.doctor_update = (req, res) =>{
	Doctor.findOneAndUpdate(req.params.permit_number, {$set: 
		{
                first_name: req.body.first_name,
                last_name: req.body.last_name, 
                password: req.body.password,
                speciality: req.body.speciality,
                city: req.body.city
            }})
		.then(doctor => {
            bcryptjs.genSalt(10, (err, salt) =>
            {
                bcryptjs.hash(doctor.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    doctor.password = hash;
                    res.json(doctor)
                })
            })
        })
}

//Delete
exports.doctor_delete = (req, res) =>{
	Doctor.findOne(req.params.permit_number)
		.then(doctor => doctor.remove()
            .then(() => res.json({success: true}))
        ).catch(err => res.status(404).json({success: false}));
}