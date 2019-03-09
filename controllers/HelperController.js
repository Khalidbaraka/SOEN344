module.exports = {
    //Method verifies if parameters (start, end) representing date for possible new timeslot overlaps with existing timeslot
    overlaps: function(appStart, appEnd, start, end) {
        
        if ((appStart >= start && appStart <= end) 
            || (appEnd >= start && appEnd <= end) 
            || (appStart >= start && appStart <= end) 
            || (appEnd >= start && appEnd <= end)) {

            return true;
        }
    },
};