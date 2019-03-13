module.exports = {
    //Method verifies if parameters (start, end) representing date for possible new timeslot overlaps with existing timeslot
    overlaps: function(appStart, appEnd, start, end) {
        return ((appStart >= start && appStart < end) 
            || (appEnd > start && appEnd <= end) 
            || (start >= appStart && start < appEnd) 
            || (end > appStart && end <= appEnd));        
    },

    //Method verifies if an appintments date lies within a timeslot
    within: function(appStart, appEnd, start, end) {
        return ((appStart >= start) && (appEnd <= end));
    },
};
