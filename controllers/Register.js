var RegisterStrategy = require('./RegisterStrategy');

exports.changeStrategy = (newStrategy,req, res) => {

    switch(newStrategy) {
        case "patient":
            return RegisterStrategy.patient_register_strategy(req,res);
            break;
        case "doctor":
            return RegisterStrategy.doctor_register_strategy(req,res);
            break;
        case "nurse":
            return RegisterStrategy.nurse_register_strategy(req,res);
            break;
        default:
            console.log("error");
    }

}