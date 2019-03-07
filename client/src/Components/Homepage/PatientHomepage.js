import React, { Component } from 'react';
import PatientNavBar from "../PatientNavBar";
import {Route, Switch} from "react-router-dom";

const jwt = require('jsonwebtoken');

class PatientHomepage extends Component {
    constructor(props) {
        super(props);
     
    }

    render() {
        return (

            <Switch>
                <Route path='/patientMyApp' component={ PatientApp }/>
                <Route path='/patientScheduleApp' component={ patientScheduleApp}/>
            </Switch>
        )
    }
}

export default PatientHomepage;