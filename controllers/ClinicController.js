const Clinic = require('./../models/Clinic');

//For back-end purposes only.
exports.clinic_create = (req,res) =>{
    Clinic.findOne({name: req.body.name})
        .then(clinic =>{
            if(clinic){
                return res.status(400).json({
                    success: false,
                    message: 'A clinic with this name is already in the database.'
                });
            }
            else{
                var newClinic = new Clinic({
                    name: req.body.name,
                    address: req.body.address,
                    doctors: [],
                    nurses: [],
                    appointments: [],
                    rooms: []
                })

                newClinic.save().then(clinic =>{
                    return res.json({
                        success: true,
                        message: 'Clinic was added to the database sucessfully.'
                    });
                }).catch(err => console.log(err));
            }
        })
}
exports.clinic_get_all = (req,res) =>{
    Clinic.find().sort({'_id': 1}).populate('doctors').populate('nurses').populate('rooms').populate('appointments')
        .then(clinics =>{
            return res.json({
                success: true,
                clinics
            });
        }).catch(err => console.log(err));
}