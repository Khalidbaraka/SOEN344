const Timeslot  = require('./../models/Timeslot');

exports.timeslot_get_list = (req, res) => {
    Timeslot.find().then(timeslots => res.json(timeslots));
};