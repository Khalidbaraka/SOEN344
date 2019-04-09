var LoginStrategy = require('./LoginStrategy');

exports.changeStrategy = (newStrategy,req, res) => {

    switch(newStrategy) {
        case "patient":
            return LoginStrategy.patient_login_strategy(req,res);
            break;
        case "doctor":
            return LoginStrategy.doctor_login_strategy(req,res);
            break;
        case "nurse":
            return LoginStrategy.nurse_login_strategy(req,res);
            break;
        default:
            console.log("error");
    }

}


