const DoctorController = require('./DoctorController');

var LoginController = function() {
    this.attr = "";
};

LoginController.prototype = {
    setStrategy: function(attr) {
        this.attr = attr;
    },

    login: function(user) {
        return this.login(user);
    }
};

var doctorLogin = function() {
    this.login = function(user) {
        DoctorController.doctor_login();
    }
};

var NurseLogin = function() {
    this.calculate = function(package) {
        // calculations...
        return "$39.40";
    }
};

var patientLogin = function() {
    this.calculate = function(package) {
        // calculations...
        return "$43.20";
    }
};

// log helper

var log = (function() {
    var log = "";

    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { alert(log); log = ""; }
    }
})();

function run() {
    var package = { from: "76712", to: "10012", weigth: "lkg" };

    // the 3 strategies

    var ups = new UPS();
    var usps = new USPS();
    var fedex = new Fedex();

    var shipping = new Shipping();

    shipping.setStrategy(ups);
    log.add("UPS Strategy: " + shipping.calculate(package));
    shipping.setStrategy(usps);
    log.add("USPS Strategy: " + shipping.calculate(package));
    shipping.setStrategy(fedex);
    log.add("Fedex Strategy: " + shipping.calculate(package));

    log.show();
}